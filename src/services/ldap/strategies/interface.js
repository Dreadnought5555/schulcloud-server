/**
 * @typedef {Object} LDAPGroup
 * @property {String} name the group name
 * @property {String} description the group description
 */

/**
 * @typedef {Object} LDAPQueryOptions
 * @property {String} searchString the search string
 * @property {Object} options the ldapjs options object
 */

/**
 * Class representing provider-specific LDAP-related operations
 * @interface
 * @abstract
 */
class AbstractLDAPStrategy {

    /**
     * @abstract
     * @param {App} app
     * @param {LDAPConfig} config
     */
    constructor(app, config) {
        if (new.target === AbstractLDAPStrategy) {
            throw new TypeError(`Cannot construct AbstractLDAPStrategy
                instances directly.`);
        }

        this.app = app;
        this.config = config;
    }

    /**
     * get provider-specific search string and options to find all schools in
     * the LDAP directory
     * @abstract
     * @returns {LDAPQueryOptions} Object containing `searchString` and `options`
     */
    getSchoolsQuery() {
        throw new TypeError('Method has to be implemented.');
    }

    /**
     * get provider-specific search string and options to find all users in
     * a given school in the LDAP directory
     * @abstract
     * @param {School} school the school
     * @returns {LDAPQueryOptions} Object containing `searchString` and `options`
     */
    getUsersQuery(school) {
        throw new TypeError('Method has to be implemented.');
    }

    /**
     * get provider-specific search string and options to find all classes in
     * a given school in the LDAP directory
     * @abstract
     * @param {School} school the school
     * @returns {LDAPQueryOptions} Object containing `searchString` and `options`
     */
    getClassesQuery(school) {
        throw new TypeError('Method has to be implemented.');
    }

    /**
     * get provider-specific search string and options to find all experts in
     * the LDAP directory
     * @abstract
     * @returns {LDAPQueryOptions} Object containing `searchString` and `options`
     */
    getExpertsQuery() {
        throw new TypeError('Method has to be implemented.');
    }

    /**
     * provider-specific functionality to add a given user to a given group
     * @abstract
     * @param {User} user the user
     * @param {Role} role the user's role
     * @param {LDAPGroup} group the LDAP group object
     * @returns {Promise} Promise that resolves on successful addition or
     * rejects otherwise
     */
	addUserToGroup(user, role, group) {
		throw new TypeError('Method has to be implemented.');
    }

    /**
     * provider-specific functionality to remove a given user from the given
     * group
     * @abstract
     * @param {User} user the user
     * @param {Role} role the user's role
     * @param {LDAPGroup} group the LDAP group object
     * @returns {Promise} Promise that resolves on successful removal or rejects
     * otherwise
     */
    removeUserFromGroup(user, role, group) {
		throw new TypeError('Method has to be implemented.');
    }

    /**
     * provider-specific functionality to create a new expert user
     * @abstract
     * @param {User} user the expert's user object
     * @param {Account} account the expert's account object
     * @returns {Promise} Promise that resolves on successful addition or
     * rejects otherwise
     */
    createExpert(user, account) {
		throw new TypeError('Method has to be implemented.');
    }

}

module.exports = AbstractLDAPStrategy;