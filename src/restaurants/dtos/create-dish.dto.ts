import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/ouput.dto';
import { Dish } from '../entities/dish.entity';

@InputType()
export class CreateDishInput extends PartialType(
  PickType(Dish, ['name', 'price', 'photo', 'description', 'restaurant']),
) {}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}
