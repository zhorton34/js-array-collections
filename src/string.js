import _ from 'lodash'

window.Str = function(string) {

    $$this = string

    /**
     * @return Boolean
     */
    $this.isDate = function()
    {
        let expression = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;

        if (toString.call($this) === '[object Date]') 
            return true;

        if (typeof $this.replace === 'function') 
            $this.replace(/^\s+|\s+$/gm, '');
        
        return expression.test($this);
    }


    /**
     * @param Number
     * @return String
     */
    $this.enforceMax = function(limit) 
    {
        return $this.truncate(limit, false)
    }

    /**
     * @param Number
     * @return Boolean
     */ 
    $this.checkMin = function(limit) 
    {
        return ($this.length <= limit)
    }

    /**
     * @param Number
     * @return Boolean
     */ 
    $this.checkMax = function(limit) 
    {
        return ($this.length >= limit)
    }  

    /**
     * @return Boolean
     *
     * Valid Formats: 
     *   (123) 456-7890
     *   (123)456-7890
     *   123-456-7890
     *   123.456.7890
     *   1234567890
     *   +31636363634
     *   075-63546725
     */
    $this.isPhoneNumber = function()
    {
        let expression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        return expression.test($this)
    }

    /**
     * @return Boolean
     */
    $this.isUrl = function()
    {
        let expression = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        
        return expression.test($this);
    }

    /**
     * @return Boolean
     */
    $this.isEmail = function()
    {
        let expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        return expression.test($this);
    }

    /**
     * @return String
     */
    $this.toSnakeCase = function()
    {
        if($this.length === 0) return $this
        
        return $this
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('_')
    }


    /**
     * @return String
     */
    $this.toTextCase = function() 
    {
        return $this
    }

    /**
     * @return String
     */
    $this.toCamelCase = function()
    {
        if($this.length === 0) return $this
        
        return $this.toSnakeCase()
                    .replace(/(\-\w)/g, function(m) 
                    {
                        return m[1].toUpperCase();
                    });
    }

    /** 
     * @return String
     */
    $this.replaceUnderscoresForSpaces = function ()
    {

        return $this.underscoreSpaces()
    }

    /**
     * @return String
     */
    $this.underscoreSpaces = function()
    {
        if($this.length === 0) return $this
        
        return $this.replace(/\s/g, '_')
    }

    /**
     * @return String
     */
    $this.capitalize = function()
    {
        
        return $this.charAt(0).toUpperCase() + $this.slice(1)

    }

    /**
     * @param String
     *
     * @return Boolean
     */
    $this.matches = function(string)
    {
        let current = $this.slice(0, $this.length)
        
        return (current === string)
    }

    /**
     * @param Number
     * @param Boolean
     *
     * @return String
     */
    $this.truncate = function(limit, dots = true)
    {
        let truncated = $this.substring(0, limit) 

        truncated = (dots) ? truncated + '...' : truncated

        return ($this.length > limit) ? truncated : $this.slice(0, $this.length)
    }

    /**
     * @return String
     */
    $this.empty = function()
    {
        switch ($this)
        {
            case "":
            case " ":
            case $this.length < 1:
                return true;
            default:
                return false;
        }
    }

    /**
     *
     * @returns {string}
     */
    $this.trim_right  = function()
    {
        
        return $this.replace(/\s+$/g, '');

    }

    /**
     *
     * @returns {string}
     */
    $this.trimRight  = function()
    {
        
        return $this.replace(/\s+$/g, '');

    }

    /**
     *
     * @param character
     * @returns {string}
     */
    $this.remove_character = function(character)
    {
        
        return $this.replace(character, "")

    }

    /**
     *
     * @param character
     * @returns {string}
     */
    $this.removeCharacter = function(character)
    {
        
        return $this.replace(character, "")

    }

    /**
     *
     * @return String
     */
    $this.trim_left = function()
    {
        
        return $this.replace(/^\s+|\s+$/g, '');

    }

    /**
     *
     * @return String
     */
    $this.trimLeft = function()
    {
        
        return $this.replace(/^\s+|\s+$/g, '');

    }

    /**
     *
     * @return String
     */
    $this.trim_both = function()
    {
       
        return $this.trim_right().trim_left()

    }

    /**
     *
     * @return String
     */
    $this.trimBoth = function()
    {
       
        return $this.trim_right().trim_left()

    }

    return $this;
}