"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const functions_1 = require("../lib/functions");
const class_validator_1 = require("class-validator");
let GameController = class GameController {
    async allGames() {
        const games = await entity_1.default.find();
        return { games: games };
    }
    getGame(id) {
        return entity_1.default.findOne(id);
    }
    async updateGame(id, curGame) {
        const oldGame = await entity_1.default.findOne(id);
        if (!oldGame)
            throw new routing_controllers_1.NotFoundError('Cannot find this game');
        const errors = await class_validator_1.validate(curGame);
        if (errors.length > 0)
            throw new routing_controllers_1.BadRequestError(`Validation failed!`);
        if (functions_1.movesValidate(oldGame.board, curGame.board) > 1)
            throw new routing_controllers_1.BadRequestError('You cannot make more than one move');
        return entity_1.default.merge(oldGame, curGame).save();
    }
    createGame(gameName) {
        const game = new entity_1.default();
        game.name = gameName;
        game.color = functions_1.getColor();
        game.board = functions_1.getBoard();
        return game.save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Get('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_1.default]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map