import CMS from 'netlify-cms';

import { TeamPreview } from './team';
import { TimetablePreview } from './timetable';

import AdminCSS from '!css-loader!./admin.css';
import TeamCSS from '!css-loader!./team.css';

CMS.registerPreviewStyle(AdminCSS.toString(), { raw: true });
CMS.registerPreviewStyle(TeamCSS.toString(), { raw: true });

CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('timetable', TimetablePreview);
