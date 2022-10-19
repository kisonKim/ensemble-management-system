import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/ouput.dto';
import { Category } from '../entities/category.entity';

@InputType()
export class AllCategoriesInput {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
