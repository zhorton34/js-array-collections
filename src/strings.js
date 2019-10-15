import _ from 'lodash'

class Stringify {
    constructor(string) {
    
        this.string = String.prototype

        /**
         * @return Boolean
         */
        this.string.isDate = function()
        {
            let expression = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;

            if (toString.call(this) === '[object Date]') 
                return true;

            if (typeof this.replace === 'function') 
                this.replace(/^\s+|\s+$/gm, '');
            
            return expression.test(this);
        }


        /**
         * @param Number
         * @return String
         */
        this.string.enforceMax = function(limit) 
        {
            return this.truncate(limit, false)
        }

        /**
         * @param Number
         * @return Boolean
         */ 
        this.string.checkMin = function(limit) 
        {
            return (this.length <= limit)
        }

        /**
         * @param Number
         * @return Boolean
         */ 
        this.string.checkMax = function(limit) 
        {
            return (this.length >= limit)
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
        this.string.isPhoneNumber = function()
        {
            let expression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

            return expression.test(this)
        }

        /**
         * @return Boolean
         */
        this.string.isUrl = function()
        {
            let expression = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
            
            return expression.test(this);
        }

        /**
         * @return Boolean
         */
        this.string.isEmail = function()
        {
            let expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
            return expression.test(this);
        }

        /**
         * @return String
         */
        this.string.snakeCase = function()
        {
           return _.snakeCase(this)
        }


        /**
         * @return String
         */
        this.string.textCase = function() 
        {
            return _.capitalize(_.lowerCase(this))
        }

        /**
         * @return String
         */
        this.string.camelCase = function()
        {            
            return _.camelCase(this)
        }

        /**
         * @return String
         */
         this.string.kebabCase = function() 
         {
            return _.kebabCase(this)
         }
        /**
         * @return String
         */
         this.string.titleCase = function()
         {
            return _.startCase(this)
         }

        /**
         * @return String
         */
        this.string.capitalize = function()
        {
            return _.capitalize(this)
        }

        /**
         * @return String
         */
         this.string.toUpper = function()
         {
            return _.toUpper(this)
         }

         /*
          * Repeat a string x manyTimes
          * @return String
          */
         this.string.repeat = function(manyTimes)
         {
            return _.repeat(this, manyTimes)
         }
  

        /**
         * @param Number
         * @param Boolean
         *
         * @return String
         */
        this.string.truncate = function(limit, dots = true)
        {
            let truncated = this.substring(0, limit) 

            truncated = (dots) ? truncated + '...' : truncated

            return (this.length > limit) ? truncated : this.slice(0, this.length)
        }

        /*
         * @return String
         */
        this.string.parseInt = function() 
        {
            return _.parseInt(this);
        }

        /**
         * @return String
         */
        this.string.empty = function()
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
         * @return String
         */
        this.string.startsWith = function(startsWith = '', startingPosition = 0) 
        {
            return _.startsWith(this, startsWith, startingPosition);

        }

        /**
         * @return String
         */
        this.string.endsWith = function(endsWith = '', startingPosition = 0) 
        {
            return _.endsWith(this, endsWith, startingPosition);

        }

        /*
         * @return String
         * Find and replace
         */
        this.string.replace = function(find = '', replace = '')
        {
            return _.replace(this, find, replace)
        }

        /*
         * @return String
         * Trim start and end of string
         */
         this.string.trim = function()
         {
            return _.trim(this)
         }
         
        /*
         * @return String
         * Trim end
         */
         this.string.trimEnd = function()
         {
            return _.trimEnd(this)
         }
                 
         /*
         * @return String
         * Trim start
         */
         this.string.trimStart = function()
         {
            return _.trimStart(this)
         }
    }
}

exports.Stringify = function(array) {
    return new Stringify(array).string
}
