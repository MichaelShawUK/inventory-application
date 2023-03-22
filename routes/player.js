const express = require("express");
const router = express.Router();
const player_controller = require("../controllers/playerController");

router.get("/", player_controller.player_list);
router.get("/create", player_controller.player_create_get);
router.post("/create", player_controller.player_create_post);
router.get("/:id/delete", player_controller.player_delete_get);
router.post("/:id/delete", player_controller.player_delete_post);
router.get("/:id/update", player_controller.player_update_get);
router.post("/:id/update", player_controller.player_update_post);
router.get("/:id", player_controller.player_info);

module.exports = router;
