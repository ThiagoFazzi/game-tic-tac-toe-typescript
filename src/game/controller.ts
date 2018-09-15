import { JsonController, Get, Put, Post, Param, HttpCode, Body, NotFoundError, BodyParam, BadRequestError } from 'routing-controllers';
import Game from './entity';
import { getColor, getBoard, colorValidate, movesValidate } from '../lib/functions';

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
      //@BodyParam('color') newColor: string,
      @Body() game: Game
    ) {
      
      const oldGame = await Game.findOne(id)
      if(!oldGame) throw new NotFoundError('Cannot find this game')

      const newGame = new Game()
      newGame.name = game.name
      newGame.color = game.color
      newGame.board = game.board
      
      if(colorValidate(newGame.color) == 0) throw new BadRequestError('This color does not be part of the pallete')
      
      if(movesValidate(oldGame.board,newGame.board) > 1) throw new BadRequestError('You cannot make more than one move')

      return Game.merge(oldGame, newGame).save()
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