/** File formats the AV team needs for anything a client supplies. */
export const AV_TEAM_EMAIL = 'avservices@mmeink.com';

export const AV_FILE_FORMATS: { label: string; specs: string[] }[] = [
  { label: 'Images', specs: ['File type: JPG or PNG'] },
  {
    label: 'Videos',
    specs: [
      'File type: MP4 or MOV',
      'Aspect ratio: 16:9',
      'Resolution: Full HD 1920 x 1080 or higher',
    ],
  },
  { label: 'Presentations', specs: ['File type: PPTX (PowerPoint)'] },
  { label: 'Audio', specs: ['File type: MP3'] },
];
