import { Router } from "express";
import AuthRepo from "../repo/authrepo";
import { createAccessToken } from "../utils/tokenreso";
import { verifyRFToken } from "../utils/tokenveri";

const router = Router();

router.get("", (_, res) => {
  res.send("Hey Kid!");
});

router.post("/reftoken", async (req, res) => {
  const { _plAu: rfToken } = req.cookies;

  const payload = verifyRFToken(rfToken);
  if (!payload) return res.sendStatus(403);

  const user = await AuthRepo.findOne({ where: { userid: payload.id } });
  if (!user) return res.sendStatus(403);

  if (payload.tkv != user.tokenVersion) return res.sendStatus(403);

  const acToken = createAccessToken(user.userid);

  res.send({
    status: 200,
    actoken: acToken,
  });
});

module.exports = router;
