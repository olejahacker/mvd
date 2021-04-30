const uploadFile = require("../middleware/upload");
const {spawn} = require("child_process");

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    var dataToSend;
    if (req.file == undefined) {
      return res.status(400).send({ message: "загрузите файл!" });
    }
    const python = spawn('py', [__basedir + '\\src\\text_grabber\\grabber.py', req.file.path ]);
    python.stdout.on('data', function (data) {
      dataToSend = data.toString();
      console.log(dataToSend);
    });
    python.on('close', (code) => {
      const python = spawn('py', [__basedir + '\\src\\classifier\\classify.py', dataToSend, __basedir + "\\src\\classifier\\",'image']);
      python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        console.log(dataToSend);
      });
      python.on('close', (code) => {
        res.status(200).send({
        message: dataToSend,
       }); 
      });
  });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "Файл не может быть больше 2 гигабайт!",
      });
    }

    res.status(500).send({
      message: `Невозможно загрузить файл: ${req.file.originalname}. ${err}`,
    });
  }
};


const checkText = (req, res) => {
  if(req.body.text === undefined)
    return res.status(400).send({ message: "Пустой запрос" });
  else
  {
    console.log(req.body.text);
    var dataToSend;
    const python = spawn('py', [__basedir + '\\src\\classifier\\classify.py', req.body.text, __basedir + "\\src\\classifier\\", "text"]);
    python.stdout.on('data', function (data) {
      dataToSend = data.toString();
    });
    console.log();
    python.on('close', (code) => {
      res.status(200).send({
      message: dataToSend,
    }); 
  });
  }
};

const index = (req,res) => {
  res.render("index");
};

const image = (req,res) => {
  res.render("image");
};

module.exports = {
  upload,
  checkText,
  index,
  image,
};
