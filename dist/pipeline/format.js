"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatEvent;

var _utils = require("../utils");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formatEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
      productId = attributes.productId,
      method = attributes.method,
      uid = attributes.uid,
      sequence = attributes.sequence,
      timestamp = attributes.timestamp,
      start = attributes.start,
      startType = attributes.startType,
      startInputType = attributes.startInputType,
      startOutputType = attributes.startOutputType,
      duration = attributes.duration,
      end = attributes.end,
      endInputType = attributes.endInputType,
      endOutputType = attributes.endOutputType,
      description = attributes.description,
      url = attributes.url,
      geo = attributes.geo,
      location = attributes.location,
      status = attributes.status,
      categories = attributes.categories,
      organizer = attributes.organizer,
      attendees = attributes.attendees,
      alarms = attributes.alarms,
      recurrenceRule = attributes.recurrenceRule,
      apple_color = attributes.apple_color,
      apple_location = attributes.apple_location;
  var icsFormat = '';
  icsFormat += 'BEGIN:VCALENDAR\r\n';
  icsFormat += 'VERSION:2.0\r\n';
  icsFormat += 'CALSCALE:GREGORIAN\r\n';
  icsFormat += (0, _utils.foldLine)("PRODID:".concat(productId)) + '\r\n';
  icsFormat += (0, _utils.foldLine)("METHOD:".concat(method)) + '\r\n';
  icsFormat += "X-PUBLISHED-TTL:PT1H\r\n";
  icsFormat += 'BEGIN:VEVENT\r\n';
  icsFormat += "UID:".concat(uid, "\r\n");
  icsFormat += (0, _utils.foldLine)("SUMMARY:".concat(title ? (0, _utils.setSummary)(title) : title)) + '\r\n';
  icsFormat += "DTSTAMP:".concat(timestamp, "\r\n"); // All day events like anniversaries must be specified as VALUE type DATE

  icsFormat += "DTSTART".concat(start && start.length == 3 ? ";VALUE=DATE" : "", ":").concat((0, _utils.formatDate)(start, startOutputType || startType, startInputType), "\r\n"); // End is not required for all day events on single days (like anniversaries)

  if (!((0, _isEqual["default"])(start, end) && end && end.length == 3)) {
    if (end) {
      icsFormat += "DTEND".concat(end.length == 3 ? ";VALUE=DATE" : "", ":").concat((0, _utils.formatDate)(end, endOutputType || startOutputType || startType, endInputType || startInputType), "\r\n");
    }
  }

  icsFormat += sequence ? "SEQUENCE:".concat(sequence, "\r\n") : '';
  icsFormat += description ? (0, _utils.foldLine)("DESCRIPTION:".concat((0, _utils.setDescription)(description))) + '\r\n' : '';
  icsFormat += url ? (0, _utils.foldLine)("URL:".concat(url)) + '\r\n' : '';
  icsFormat += geo ? (0, _utils.foldLine)("GEO:".concat((0, _utils.setGeolocation)(geo))) + '\r\n' : '';
  icsFormat += location ? (0, _utils.foldLine)("LOCATION:".concat(location)) + '\r\n' : '';
  icsFormat += status ? (0, _utils.foldLine)("STATUS:".concat(status)) + '\r\n' : '';
  icsFormat += categories ? (0, _utils.foldLine)("CATEGORIES:".concat(categories)) + '\r\n' : '';
  icsFormat += organizer ? (0, _utils.foldLine)("ORGANIZER;".concat((0, _utils.setOrganizer)(organizer))) + '\r\n' : '';

  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += (0, _utils.foldLine)("ATTENDEE;".concat((0, _utils.setContact)(attendee))) + '\r\n';
    });
  }

  if (alarms) {
    alarms.map(function (alarm) {
      icsFormat += (0, _utils.setAlarm)(alarm);
    });
  }

  icsFormat += apple_color ? "X-APPLE-CALENDAR-COLOR:".concat(apple_color, "\r\n") : '';
  icsFormat += apple_location ? "X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS=Rue Lac de la Thuile\\n73370 Le Bourget-du-Lac\\nFrance;X-APPLE-RADIUS=50;X-TITLE=Universit\xE9 de Savoie - Campus du Bourget du Lac:geo:45.642586,5.871763\r\n" : '';
  icsFormat += recurrenceRule ? "RRULE:".concat(recurrenceRule, "\r\n") : '';
  icsFormat += duration ? "DURATION:".concat((0, _utils.formatDuration)(duration), "\r\n") : '';
  icsFormat += "END:VEVENT\r\n";
  icsFormat += "END:VCALENDAR\r\n";
  return icsFormat;
}