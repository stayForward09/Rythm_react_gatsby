import createClass from 'create-react-class';

export const TimetablePreview = createClass({
  render: function() {
    const h = window.h;
    const entry = this.props.entry;

    const title = entry.getIn(['data', 'title']);
    const monday = this.props.widgetFor('monday');
    const tuesday = this.props.widgetFor('tuesday');
    const wednesday = this.props.widgetFor('wednesday');
    const thursday = this.props.widgetFor('thursday');
    const friday = this.props.widgetFor('friday');
    const saturday = this.props.widgetFor('saturday');
    const sunday = this.props.widgetFor('sunday');

    return h(
      'div',
      { className: 'timetable' },
      h('h1', {}, title && title.toUpperCase()),
      monday && h('div', {}, h('h4', {}, 'Monday:'), h('p', { className: 'monday' }, monday)),
      tuesday && h('div', {}, h('h4', {}, 'Tuesday:'), h('p', { className: 'tuesday' }, tuesday)),
      wednesday &&
        h('div', {}, h('h4', {}, 'Wednesday:'), h('p', { className: 'wednesday' }, wednesday)),
      thursday &&
        h('div', {}, h('h4', {}, 'Thursday:'), h('p', { className: 'thursday' }, thursday)),
      friday && h('div', {}, h('h4', {}, 'Friday:'), h('p', { className: 'friday' }, friday)),
      saturday &&
        h('div', {}, h('h4', {}, 'Saturday:'), h('p', { className: 'saturday' }, saturday)),
      sunday && h('div', {}, h('h4', {}, 'Sunday:'), h('p', { className: 'sunday' }, sunday))
    );
  },
});
