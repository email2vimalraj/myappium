app.adapters.employee = (function () {

    var findById = function (id) {
            var deferred = $.Deferred();
            var employee = null;

            var results = [];
            var options = new ContactFindOptions();
                options.filter = id;
                options.multiple = true;

            navigator.contacts.find(["id"], function(contacts) {
                employee = toEmployee(v);

                deferred.resolve(employee);
                return deferred.promise();
            }, function(err) {
                //alert(err);
                deferred.resolve(employee);
                return deferred.promise();
            }, options);

            var l = employees.length;
            for (var i = 0; i < l; i++) {
                if (employees[i].id === id) {
                    employee = employees[i];
                    break;
                }
            }
            deferred.resolve(employee);
            return deferred.promise();
        },

        toEmployee = function(contact) {
            var name = contact.displayName || contact.name.formatted;
            var nsplit = name.split(" ");
            return {
                id: contact.id,
                firstName: nsplit[0],
                lastName: nsplit[1],
                managerId: 0,
                managerName: "",
                reports: 0,
                title: "",
                department: "",
                cellPhone: "",
                officePhone: "",
                email: "",
                city: "",
                pic: "",
                twitterId: "",
                blog: ""
            };
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            var results = [];
            var options = new ContactFindOptions();
                options.filter = searchKey;
                options.multiple = true;

            navigator.contacts.find(["*"], function(contacts) {
                _.each(contacts, function(v, i) {
                    results.push(toEmployee(v));
                });

                deferred.resolve(results);
                return deferred.promise();
            }, function(err) {
                //alert(err);
                deferred.resolve([]);
                return deferred.promise();
            }, options);
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred();
            var results = employees.filter(function (element) {
                return managerId === element.managerId;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        initialized = false,

        initialize = function() {
            if (typeof navigator.contacts === "undefined") {
                ContactFindOptions = function() {}; // yes, global!
                navigator.contacts = {
                    find: function() {},
                    create: function() { return { save: function() {} } }
                };
            }

            var options = new ContactFindOptions();
                options.filter = employees[0].lastName;
                options.multiple = false;

            navigator.contacts.find(["*"], function(contacts) {
                if (contacts.length <= 0) {
                    create();
                }
            }, function(err) {
                //alert(err);
            }, options);
            
            initialized = true;
        },

        create = function() {
            _.each(employees, function(v, i) {
                var cnt = navigator.contacts.create();
                    cnt.displayName = cnt.nickname = [v.firstName, " ", v.lastName].join("");
                    cnt.name = {
                        givenName: v.firstName,
                        familyName: v.lastName
                    };
                cnt.save(function() {
                    //alert("Success");
                });
                console.log(cnt);
            });
        },

        employees = [
            {"id": 1, "firstName": "James", "lastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
            {"id": 2, "firstName": "Julie", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
            {"id": 3, "firstName": "Eugene", "lastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
            {"id": 4, "firstName": "John", "lastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
            {"id": 5, "firstName": "Ray", "lastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
            {"id": 6, "firstName": "Paul", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
            {"id": 7, "firstName": "Paula", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
            {"id": 8, "firstName": "Lisa", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
            {"id": 9, "firstName": "Gary", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
            {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
            {"id": 11, "firstName": "Amy", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
            {"id": 12, "firstName": "Steven", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
        ];

    // The public API
    return {
        initialize: initialize,
        findById: findById,
        findByName: findByName,
        findByManager: findByManager
    };

}());

