import _ from 'lodash'

/**
 *
 * @returns {*}
 */
String.prototype.toSnakeCase = function()
{
    if(this.length === 0) return this
    
    return this
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('_')
}

/**
 *
 * @returns {*}
 */
String.prototype.underscoreSpaces = function()
{
    if(this.length === 0) return this
    
    return this.replace(/\s/g, '_')
}

/**
 *
 * @returns {string}
 */
String.prototype.capitalize = function()
{
    
    return this.charAt(0).toUpperCase() + this.slice(1)

}

/**
 *
 * @param str
 * @returns {boolean}
 */
String.prototype.matches = function(str)
{
    let current = this.slice(0, this.length)
    
    return (current === str)
}

/**
 *
 * @param max_characters
 * @returns {string}
 */
String.prototype.truncate = function(max_characters)
{
    
    return (this.length > max_characters)
        ? this.substring(0, max_characters) + '...'
        : this.slice(0, this.length)

}

/**
 *
 * @returns {boolean}
 */
String.prototype.empty = function()
{
    switch (this)
    {
        case "":
        case " ":
        case this.length < 1:
            return true;
        default:
            return false;
    }
}

/**
 *
 * @returns {string}
 */
String.prototype.trim_right  = function()
{
    
    return this.replace(/\s+$/g, '');

}

/**
 *
 * @param character
 * @returns {string}
 */
String.prototype.remove_character = function(character)
{
    
    return this.replace(character, "")

}

/**
 *
 * @returns {string}
 */
String.prototype.trim_left = function()
{
    
    return this.replace(/^\s+|\s+$/g, '');

}

/**
 *
 * @returns {string}
 */
String.prototype.trim_both = function()
{
   
    return this.trim_right().trim_left()

}