import { JsonController, Get, Put, Post, Param, HttpCode, Body, NotFoundError, BodyParam, BadRequestError } from 'routing-controllers';
import Game from './entity';
import { getColor, getBoard, moves, colorArray } from './functions';

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
      @BodyParam('color') newColor: string,
      @Body() newGame: Partial<Game>
    ) {
      
      const oldGame = await Game.findOne(id)
      if(!oldGame) throw new NotFoundError('Cannot find this game')

      if(moves(JSON.stringify(oldGame.board),newGame.board) > 1) throw new BadRequestError('You cannot make more than one move')

      //This solution is not good because the better solution is use a Validator on the class, but dosent work
      if(!colorArray.includes(newColor)) throw new BadRequestError('You can only change color for : red | blue | green | yellow | magenta')
           
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