import { JsonController, Get, Put, Post, Param, HttpCode, Body, NotFoundError, BodyParam, BadRequestError } from 'routing-controllers';
import Game from './entity';
import { getColor, getBoard, movesValidate, colorValidate } from '../lib/functions';

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
      const games = await Game.find()
      return { games: games }
    }

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }

    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,
      @Body() curGame: Game
    ) {
      const oldGame = await Game.findOne(id)
      if(!oldGame) throw new NotFoundError('Cannot find this game')
      
      if(colorValidate(curGame.color) === 0) throw new BadRequestError('This color does not be part of the pallete')
      
      if(movesValidate(oldGame.board,curGame.board) > 1) throw new BadRequestError('You cannot make more than one move')
      
      return Game.merge(oldGame, curGame).save()
    }

    @Post('/games')
    @HttpCode(201)
    createGame( 
      @BodyParam('name') gameName: string
    ) {

      const game = new Game()
      game.name = gameName
      game.color = getColor()
      game.board = getBoard()
 
      return game.save()
    }
}