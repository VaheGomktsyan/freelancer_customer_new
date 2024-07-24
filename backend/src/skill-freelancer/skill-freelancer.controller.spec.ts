import { Test, TestingModule } from '@nestjs/testing';
import { SkillFreelancerController } from './skill-freelancer.controller';
import { SkillFreelancerService } from './skill-freelancer.service';

describe('SkillFreelancerController', () => {
  let controller: SkillFreelancerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillFreelancerController],
      providers: [SkillFreelancerService],
    }).compile();

    controller = module.get<SkillFreelancerController>(SkillFreelancerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
