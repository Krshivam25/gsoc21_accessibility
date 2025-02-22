/**
 * @copyright  (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

if (Joomla && Joomla.getOptions('js-extensions-update')) {
  const options = Joomla.getOptions('js-joomla-update');

  const update = (type, text) => {
    const link = document.getElementById('plg_quickicon_joomlaupdate');
    const linkSpans = [].slice.call(link.querySelectorAll('span.j-links-link'));
    if (link) {
      link.classList.add(type);
    }

    if (linkSpans.length) {
      linkSpans.forEach((span) => {
        span.innerHTML = text;
      });
    }
  };

  fetch(options.ajaxUrl, { method: 'GET' })
    .then((response) => {
      response.json().then((updateInfoList) => {
        if (Array.isArray(updateInfoList)) {
          if (updateInfoList.length === 0) {
            // No updates
            update('success', Joomla.Text._('PLG_QUICKICON_JOOMLAUPDATE_UPTODATE'));
          } else {
            const updateInfo = updateInfoList.shift();

            if (updateInfo.version !== options.version) {
              update('danger', Joomla.Text._('PLG_QUICKICON_JOOMLAUPDATE_UPDATEFOUND').replace('%s', `<span class="badge text-dark bg-light"> \u200E ${updateInfo.version}</span>`));
            } else {
              update('success', Joomla.Text._('PLG_QUICKICON_JOOMLAUPDATE_UPTODATE'));
            }
          }
        } else {
          // An error occurred
          update('danger', Joomla.Text._('PLG_QUICKICON_JOOMLAUPDATE_ERROR'));
        }
      })
        .catch(() => {
          // An error occurred
          update('danger', Joomla.Text._('PLG_QUICKICON_JOOMLAUPDATE_ERROR'));
        });
    })
    .catch(() => {
      // An error occurred
      update('danger', Joomla.Text._('PLG_QUICKICON_JOOMLAUPDATE_ERROR'));
    });
}
