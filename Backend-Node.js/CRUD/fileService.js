const uuid = require("uuid");
const path = require("path");

class FileService {
  saveFile(file) {
    try {
      console.log('мы в файл-сервисе')
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve("CRUD/static", fileName);
      console.log('после filePath ', filePath)
      file.mv(filePath);
      return fileName;
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports=new FileService()
