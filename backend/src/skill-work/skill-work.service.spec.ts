import { Test, TestingModule } from '@nestjs/testing';
import { SkillWorkService } from './skill-work.service';

describe('SkillWorkService', () => {
  let service: SkillWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillWorkService],
    }).compile();

    service = module.get<SkillWorkService>(SkillWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
