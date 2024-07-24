import { Test, TestingModule } from '@nestjs/testing';
import { SkillWorkController } from './skill-work.controller';
import { SkillWorkService } from './skill-work.service';

describe('SkillWorkController', () => {
  let controller: SkillWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillWorkController],
      providers: [SkillWorkService],
    }).compile();

    controller = module.get<SkillWorkController>(SkillWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
