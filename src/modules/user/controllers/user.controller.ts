import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guard';
import { UserService } from '@modules/user/services';
import { ChangeUserRoleDto } from '../dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
   * route to get user by id
   * @param req req object
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOne(id);

    return {
      status: 'success',
      message: 'Successfully fetched user',
      data: user,
    };
  }

  /**
   * route to update user to admin
   * @param {string} id
   * @param req request object
   */
  @Patch(':id/changeUserRole')
  @UseGuards(JwtAuthGuard)
  async changeUserRole(
    @Param('id') id: string,
    @Request() req,
    @Body() payload: ChangeUserRoleDto,
  ): Promise<any> {
    await this.userService.changeUserRole(id, req.user.userId, payload);

    return {
      status: 'success',
      message: 'User updated successfully',
    };
  }
}
