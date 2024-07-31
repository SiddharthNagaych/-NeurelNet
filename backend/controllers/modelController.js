const modelService = require('../services/modelService');

exports.trainModel = async (req, res) => {
  try {
    const { modelType, params } = req.body;
    const result = await modelService.trainModel(modelType, params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error training model' });
  }
};

exports.freezeModel = async (req, res) => {
  try {
    const { modelType, exportPath } = req.body;
    const result = await modelService.freezeModel(modelType, exportPath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error freezing model' });
  }
};

