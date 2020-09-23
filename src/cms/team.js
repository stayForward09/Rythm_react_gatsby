import createClass from 'create-react-class';

export const TeamPreview = createClass({
  render: function() {
    const h = window.h;
    const entry = this.props.entry;

    const name = entry.getIn(['data', 'title']);
    const titles = entry.getIn(['data', 'titles']);
    const image = entry.getIn(['data', 'avatar']);
    const body = this.props.widgetFor('body');
    const details = this.props.widgetFor('details');

    return h(
      'div',
      { className: 'team' },
      image
        ? h('img', {
            src: this.props.getAsset(image).toString(),
            className: 'avatar',
          })
        : null,
      h('h1', {}, name && name.toUpperCase()),
      h('blockquote', {}, titles && titles.split('\n').map(title => h('p', {}, title))),
      h('p', { className: 'details' }, details),
      h('hr', { className: 'separator' }),
      h('p', { className: 'description' }, body)
    );
  },
});
