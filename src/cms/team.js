import createClass from 'create-react-class';

export const TeamPreview = createClass({
  render: function() {
    const h = window.h;
    const entry = this.props.entry;

    const title = entry.getIn(['data', 'title']);
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
      h('h1', {}, title && title.toUpperCase()),
      h('p', { className: 'description' }, body),
      h('p', { className: 'details' }, details)
    );
  },
});
