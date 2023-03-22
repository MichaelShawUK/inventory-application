const express = require("express");
const router = express.Router();
const club_controller = require("../controllers/clubController");

router.get("/", club_controller.club_list);
router.get("/create", club_controller.club_create_get);
router.post("/create", club_controller.club_create_post);
router.get("/:id/delete", club_controller.club_delete_get);
router.post("/:id/delete", club_controller.club_delete_post);
router.get("/:id/update", club_controller.club_update_get);
router.post("/:id/update", club_controller.club_update_post);
router.get("/:id", club_controller.club_info);

module.exports = router;
