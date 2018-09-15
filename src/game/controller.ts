import { JsonController, Get, Put, Post, Param, HttpCode, Body, NotFoundError, BodyParam } from 'routing-controllers';
import Game from './entity';
import { getColor, getBoard } from './functions';



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
      @Body() update: Partial<Game>
    ) {
      
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('Cannot find this game')
      


      return Game.merge(game, update).save()
    }

    @Post('/games')
    @HttpCode(201)
    createGame( 
      @BodyParam('name') gameName: String
    ) {

      const game = new Game()
      game.name = gameName
      game.color = getColor()
      game.board = getBoard()
 
      return game.save()
    }
}