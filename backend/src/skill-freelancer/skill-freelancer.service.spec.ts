import { Test, TestingModule } from '@nestjs/testing';
import { SkillFreelancerService } from './skill-freelancer.service';

describe('SkillFreelancerService', () => {
  let service: SkillFreelancerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillFreelancerService],
    }).compile();

    service = module.get<SkillFreelancerService>(SkillFreelancerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
