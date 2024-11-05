import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '이벤트 1',
      date: '2024-11-03',
      startTime: '10:00',
      endTime: '12:00',
      description: '이벤트 1 설명',
      location: '이벤트 1 장소',
      category: 'work',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 60,
    },
  ];
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const now = new Date('2024-11-03T09:00:00');
    const notifiedEvents: string[] = [];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual(events);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const now = new Date('2024-11-03T09:00:00');
    const notifiedEvents: string[] = ['1'];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-11-03T08:00:00');
    const notifiedEvents: string[] = [];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-11-03T11:00:00');
    const notifiedEvents: string[] = [];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: '이벤트 1',
      date: '2024-11-03',
      startTime: '10:00',
      endTime: '12:00',
      description: '이벤트 1 설명',
      location: '이벤트 1 장소',
      category: 'work',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 60,
    };
    const result = createNotificationMessage(event);
    expect(result).toBe('60분 후 이벤트 1 일정이 시작됩니다.');
  });
});
