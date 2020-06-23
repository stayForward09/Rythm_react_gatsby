import CMS from 'netlify-cms';

import { TeamPreview } from './team';
import { TimetablePreview } from './timetable';

import AdminCSS from '!css-loader!./admin.css';
import TeamCSS from '!css-loader!./team.css';

CMS.registerPreviewStyle(AdminCSS.toString(), { raw: true });
CMS.registerPreviewStyle(TeamCSS.toString(), { raw: true });

CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('timetable', TimetablePreview);

CMS.registerEditorComponent({
  id: 'youtube',
  label: 'YouTube',
  fields: [{ name: 'id', label: 'YouTube Video ID', widget: 'string' }],
  pattern: /^youtube (\S+)$/,
  fromBlock: function(match) {
    return {
      id: match[1],
    };
  },
  toBlock: function(obj) {
    return 'youtube ' + obj.id;
  },
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="YouTube Video"/>'
    );
  },
});

CMS.registerEditorComponent({
  id: 'linkimage',
  label: 'Link Image',
  fields: [
    { name: 'id', label: 'Link Image', widget: 'image' },
    { name: 'link', label: 'Link', widget: 'string' },
    { name: 'description', label: 'Description', widget: 'string' },
  ],
  toBlock: function(obj) {
    return `[![${obj.description}](${obj.id})](${obj.link})`;
  },
  toPreview: function(obj) {
    return `<a href="${obj.link}"><img src="${obj.id}" alt="${obj.description}"/></a>`;
  },
});

CMS.registerEditorComponent({
  id: 'profileImages',
  label: 'Profile Description Image',
  fields: [
    { name: 'id', label: 'Image', widget: 'image' },
    { name: 'description', label: 'Description', widget: 'string' },
  ],
  toBlock: function(obj) {
    return `<img src="${obj.id}" alt="${obj.description}"/>`;
  },
  toPreview: function(obj) {
    return `<img src="${obj.id}" alt="${obj.description}"/>`;
  },
});

CMS.registerEditorComponent({
  id: 'quote',
  label: 'Quote',
  fields: [
    { name: 'id', label: 'Quote', widget: 'string' },
    { name: 'author', label: 'Author', widget: 'string' },
  ],
  toBlock: function(obj) {
    return `<blockquote class="otro-blockquote">${obj.id}<span>${obj.author}</span></blockquote>`;
  },
  toPreview: function(obj) {
    return `<blockquote class="otro-blockquote">${obj.id}<span>${obj.author}</span></blockquote>`;
  },
});
