import laporanService from "../service/laporan-service.js";

const getLaporanJumlahTamu = async (req, res, next) => {
  try {
    const result = await laporanService.getLaporanJumlahTamu(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getLaporanPendapatanBulanan = async (req, res, next) => {
  try {
    const result = await laporanService.getLaporanPendapatanBulanan(req.body);
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
};
