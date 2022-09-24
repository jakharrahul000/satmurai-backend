import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guard';
import { UserService } from '@modules/user/services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * route to get user by id
   * @param req req object
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req): Promise<any> {
    const user = await this.userService.findOne(req.user.userId);

    return {
      status: 'success',
      message: 'Successfully fetched user',
      data: user,
    };
  }

  /**
   * route to get all users
   */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<any> {
    const users = await this.userService.findAll();

    return {
      status: 'success',
      message: 'Successfully fetched users',
      data: users,
    };
  }

  /**
   * route to update user to admin
   * @param {string} id
   * @param req request object
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateToAdmin(@Param('id') id: string, @Request() req): Promise<any> {
    await this.userService.updateToAdmin(id, req.user.userId);

    return {
      status: 'success',
      message: 'User updated successfully',
    };
  }
}
