const TeamPreview = createClass({
  render: function() {
    const entry = this.props.entry
    const title = entry.getIn(['data', 'title'])
    const image = entry.getIn(['data', 'avatar'])
    const body = this.props.widgetFor('body')

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
      h('p', { className: 'description' }, body)
    )
  },
})

module.exports = { TeamPreview }
