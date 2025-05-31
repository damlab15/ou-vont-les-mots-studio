export default {
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    { 
      name: 'title',
      title: 'Titre',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bodyPreview',
      title: 'Preview',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule =>
        Rule.custom(blocks => {
          if (!blocks) return true;
          const text = blocks
            .map(block => 
              block.children
                .map(child => child.text)
                .join('')
            )
            .join('');
          return text.length <= 150 ? true : 'Maximum 150 caractères autorisés';
        })
    },
    {
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'Date',
      type: 'datetime',
      title: 'Date de publication',
      options: {
        dateformat: 'YYYY-MM-DD',
        timeformat: 'HH:mm',
        timestep: 15,
        calendarTodayLabel: "Aujourd'hui"
      }
    }
  ]
}
