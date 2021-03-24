require("dotenv").config();
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

const REGION = process.env.REACT_APP_CLIENT_AWS_REGION;

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: process.env.REACT_APP_CLIENT_AWS_POOLID,
  }),
});

const bucketName = process.env.REACT_APP_CLIENT_AWS_BUCKETNAME;

/**
새로 만들 파일의 인덱스를 제공해줍니다.
입력값으로 주어진 folder가 없으면 foler를 생성하고 
초기 인덱스인 1을 반환합니다.

@param {string} folder: 새로 생성할 폴더 이름

@returns
-1 : 리스트를 가져오는 것에서 오류가 나거나 폴더 생성하는데서 오류 발생
0< : 다음 파일 인덱스 번호 
*/
const getNextFileIndex = async (folder) => {
  const folderKey = folder + "/";

  try {
    const originData = await s3.send(
      new ListObjectsCommand({
        Prefix: folderKey,
        Bucket: bucketName,
      })
    );
    const data = originData.Contents;

    if (data) {
      if (data.length === 1) return 1;
      else {
        const lastIndex = data[data.length - 1].Key.split("/")[1].split(".")[0];
        return Number(lastIndex) + 1;
      }
    } else {
      //새로 경로를 만들고 1을 리턴해주면 된다.
      await s3.send(
        new PutObjectCommand({
          Key: folderKey,
          Bucket: bucketName,
        })
      );

      return 1;
    }
  } catch (err) {
    // console.log("Error occurred in aws upload.js\n", err);
    return -1;
  }
};

/**
개별 파일을 업로드합니다.
중복된 이름의 파일이 있는 경우 덮어쓰기가 됩니다.

@param {string} folder 저장할 디렉토리 정보
@param {FileList} files 파일 정보(`<input type=file />`의 files를 넣어주면 됩니다.)
@param {string} fileName 업로드 시 사용할 파일이름(확장자는 넣지 않습니다.)
확장자의 경우 files에서 가져와서 사용할 것입니다.

@returns {}
-1: 파일이 존재하지 않는 경우
-2: 업로드 구문에 에러 발생
경로 문자열: 정상적으로 업로드 된 경우 해당 파일의 경로를 반환(s3버킷 이름 이후 경로)
*/
const uploadFile = async (folder, files, fileName) => {
  try {
    const folderKey = folder + "/";
    const file = files[0];
    const splitData = file.name.split(".");
    fileName = fileName + "." + splitData.pop();
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: folderKey + fileName,
        Body: file,
        ACL: "public-read",
      })
    );
    return folderKey + fileName;
  } catch (err) {
    if (!files.length) {
      //파일이 존재하지 않는 상태.
      return -1;
    }
    //전송과정에서 문제가 생긴 것.
    return -2;
  }
};

/**
개별 파일을 삭제합니다.

@param {stirng} fileName : 파일 경로 (형식 폴더명/파일이름.확장자)

@returns
1: 정상 삭제
-1: 오류 발생
*/
const deleteFile = async (fileName) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Key: fileName,
        Bucket: bucketName,
      })
    );
    return 1;
  } catch (err) {
    //파일 삭제 실패
    return -1;
  }
};

/**
folder를 삭제합니다.
folder안에 있는 파일 또한 같이 삭제됩니다.

@param {string} folder : 폴더명

@returns
1: 정상 삭제
-1: 폴더 조회 중 오류 발생
-2: 폴더 삭제 중 오류 발생
*/
const deleteFolder = async (folder) => {
  const folderKey = folder + "/";

  try {
    const data = await s3.send(
      new ListObjectsCommand({ Bucket: bucketName, Prefix: folderKey })
    );
    const objects = data.Contents.map(function (object) {
      return { Key: object.Key };
    });
    try {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: bucketName,
          Delete: { Objects: objects },
          Quiet: true,
        })
      );
      return 1;
    } catch (err) {
      return -2;
    }
  } catch (err) {
    return -1;
  }
};

/**
 * email주소와 input태그의 files를 넘겨주면
 * 이메일을 폴더명으로 한 폴더를 생성하거나 찾아내어 해당 폴더에 파일을 저장합니다.
 * 이 때 파일이름은 폴더내의 인덱스를 따라 저장됩니다.
 * @param {string} email
 * @param {FileList} files
 * @returns route경로 || -1 : 파일이 없음 || -2: 그 외 오류
 */
const uploadSurpinThumbnail = async (email, files) => {
  if (!files.length) return -1;
  try {
    const filename = await getNextFileIndex(email);

    const savedFileLocation = await uploadFile(email, files, filename);
    return `http://${bucketName}/${savedFileLocation}`;
  } catch (err) {
    return -2;
  }
};

/**
 * 기존 썸내일 경로와 새로운 파일이 담긴 input태그의 files를 넘겨주면
 * 기존 썸내일 파일을 삭제하고 동일한 파일명으로 파일을 업로드합니다.
 * 확장자가 다를 수도 있으니 결과값으로 전체 경로를 반환해줍니다.
 * @param {string} route
 * @param {FileList} files
 * @returns route경로 || -1 : 파일이 없음 || -2: 그 외 오류
 */
const changeSurpinThumbnail = async (route, files) => {
  if (!files.length) return -1;
  try {
    const targetLocation = new URL(route).pathname.substring(1);
    await deleteFile(targetLocation);

    const splitDataOfLocation = targetLocation.split("/");

    const fullFilename = splitDataOfLocation.pop();
    const filename = fullFilename.substring(0, fullFilename.lastIndexOf("."));

    const folder = splitDataOfLocation.join("/");

    const savedFileLocation = await uploadFile(folder, files, filename);
    return `http://${bucketName}/${savedFileLocation}`;
  } catch (err) {
    return -2;
  }
};

module.exports = {
  getNextFileIndex,
  uploadFile,
  deleteFile,
  deleteFolder,
  uploadSurpinThumbnail,
  changeSurpinThumbnail,
};
