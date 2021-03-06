/**
 * Constants for holding source type references.
 */
const TYPE_DISRUPTION = 'disruption';
const TYPE_EMERGENCY = 'emergency';
const TYPE_WEATHER = 'weather';

/**
 * Comparison function that determines when a source is
 * considered to have "new" information.
 * 
 * If the function returns `true`, that means that `oldItem == newItem`
 * and nothing has changed. If it returns false, that indicates
 * there is different information available.
 * 
 * @param {{rss:{channel:[{item: any[] | undefined }]}}} oldItem Array of RSS items extracted from old feed
 * @param {{rss:{channel:[{item: any[] | undefined }]}}} newItem Array of RSS items extracted from new feed
 */
const compare = ({
  rss: {
    channel: [{
      item: oldItem
    }]
  }
}, {
  rss: {
    channel: [{
      item: newItem
    }]
  }
}, ) => {
  if (oldItem && oldItem.length) {
    if (!newItem || !newItem.length || newItem.length !== oldItem.length) {
      return false;
    }
    if (newItem && newItem.length) {
      const [{
        pubDate: [oldLastDate]
      }] = oldItem;
      const [{
        pubDate: [newLastDate]
      }] = newItem;
      return oldLastDate === newLastDate;
    }
  } else {
    return !(newItem && newItem.length);
  }
}

const SOURCE_LIST = [{
    type: TYPE_DISRUPTION,
    // url: 'http://localhost:8080/service_disruptions.xml', // testing
    // url: 'https://shared.ontariotechu.ca/global/inc/get/servicedisruptionsdemo.xml', // staging
    url: 'https://news.ontariotechu.ca/topic/service_disruptions.xml', // production
    xml: true,
    compare
  },
  {
    type: TYPE_EMERGENCY,
    // url: 'http://localhost:8080/emergency_messages.xml', // testing
    // url: 'http://alertus.oncampus.local/alertusmw/getFeed.jsp?alertServiceId=5&noAlertsTitle=Test&noAlertsMessage=This%20is%20a%20test', // staging
    url: 'https://api.ontariotechu.ca/v2/util/rss-add-severity?url=http://alertus.oncampus.local/alertusmw/getFeed.jsp&severity=emergency', // production (proxy)
    // url: 'http://alertus.oncampus.local/alertusmw/getFeed.jsp?alertServiceId=5', // production
    interval: 10000,
    xml: true,
    compare
  }
]

exports = module.exports = {
  SOURCE_LIST,
  TYPE_DISRUPTION,
  TYPE_EMERGENCY,
  TYPE_WEATHER
};