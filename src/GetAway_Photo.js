GetAway_Photo.prototype.constructor = GetAway_Photo;


/**
 * Construct an Image.
 *
 * @constructor
 * @param id
 * @param smallSizeUrl
 * @param mediumSizeUrl
 * @param largeSizeUrl
 * @param originalSizeUrl
 * @param title
 * @param description
 */
function GetAway_Photo(id, smallSizeUrl, mediumSizeUrl, largeSizeUrl, originalSizeUrl, title, description) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.smallSizeUrl = smallSizeUrl;
  this.mediumSizeUrl = mediumSizeUrl;
  this.largeSizeUrl = largeSizeUrl;
  this.originalSizeUrl = originalSizeUrl;
}