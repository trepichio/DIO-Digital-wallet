import UserParams from "@src/types/user-params";
import Timeline, { Event } from "@src/types/timeline";
import timelineRepo from "@src/ports/repos/timeline";

const createWelcomeEvent = (_userParams: UserParams): Event => ({
  description: `Welcome ${_userParams.fullname}`,
  datetime: new Date()
});

export default async function createTimeline(_userParams:UserParams): Promise<Timeline> {
  const timeline: Timeline = {
    userId: _userParams.userId,
    events: [
      createWelcomeEvent(_userParams)
    ]
  };

  timelineRepo.insert(timeline);

  return timeline;
};