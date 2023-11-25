import laporanService from "../service/laporan-service.js";

const getLaporanJumlahTamu = async (req, res, next) => {
  try {
    const result = await laporanService.getLaporanJumlahTamu(req.query);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getLaporanPendapatanBulanan = async (req, res, next) => {
  try {
    const result = await laporanService.getLaporanPendapatanBulanan(req.query);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getLaporanCustomerBaru = async (req, res, next) => {
  try {
    const result = await laporanService.getLaporanCustomerBaru(req.query);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getLaporanJumlahTamu,
  getLaporanPendapatanBulanan,
  getLaporanCustomerBaru,
};
