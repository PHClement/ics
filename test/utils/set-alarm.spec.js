import { expect } from 'chai'
import { setAlarm } from '../../src/utils'

describe.only('utils.setAlarm', () => {
  it('sets an alarm', () => {
    const attributes = {
      repeat: 5,
      description: 'Foo',
      action: 'audio',
      duration: {
        weeks: 1,
        days: 15,
        hours: 3,
        minutes: 4,
        seconds: 50
      }
    }
    const alarm = setAlarm(attributes)
    expect(alarm).to.contain('BEGIN:VALARM')
    expect(alarm).to.contain('ACTION:audio')
    expect(alarm).to.contain('REPEAT:5')
    expect(alarm).to.contain('DURATION:P1W15DT3H4M50S')
    expect(alarm).to.contain('DESCRIPTION:Foo')
    expect(alarm).to.contain('END:VALARM')
  })
})


// BEGIN:VALARM
// TRIGGER;VALUE=DATE-TIME:19970317T133000Z
// REPEAT:4
// DURATION:PT15M
// ACTION:AUDIO
// ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/
//  sounds/bell-01.aud
// END:VALARM

// action: Joi.string().regex(/audio|display|email/).required(),
// trigger: Joi.string().required(),
// description: Joi.string(),
// duration: Joi.string(),
// repeat: Joi.string(),
// attach: Joi.any(),
// summary: Joi.string(),
// attendee: contactSchema,
// 'x-prop': Joi.any(),
// 'iana-prop': Joi.any()