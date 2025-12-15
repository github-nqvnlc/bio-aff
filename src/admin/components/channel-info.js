import { getChannel } from '../../shared/tiktok-auth.js';

/**
 * Render channel info into the provided container element.
 *
 * @param {HTMLElement} container
 */
export function renderChannelInfo(container) {
  if (!container) return;
  const channel = getChannel();
  if (!channel) {
    container.innerHTML =
      '<p class=\"channel-info-empty\">Connect your TikTok channel to see details here.</p>';
    return;
  }

  const followersLabel =
    typeof channel.followers === 'number'
      ? new Intl.NumberFormat('en-US').format(channel.followers)
      : '—';

  container.innerHTML = `
    <div class=\"channel-info-card\">
      <div class=\"channel-info-avatar-wrapper\">
        <img
          class=\"channel-info-avatar\"
          src=\"${channel.avatar || ''}\"
          alt=\"Channel avatar\"
          loading=\"lazy\"
          onerror=\"this.src='https://via.placeholder.com/80?text=Avatar';\"
        />
      </div>
      <div class=\"channel-info-main\">
        <div class=\"channel-info-header\">
          <h3 class=\"channel-info-name\">${channel.name || 'TikTok Channel'}</h3>
          <span class=\"channel-info-id\">@${channel.tiktokId || 'unknown'}</span>
        </div>
        <p class=\"channel-info-bio\">${channel.bio || 'No bio yet.'}</p>
        <div class=\"channel-info-meta\">
          <span class=\"channel-info-followers\">
            <strong>${followersLabel}</strong> followers
          </span>
        </div>
      </div>
    </div>
  `;
}