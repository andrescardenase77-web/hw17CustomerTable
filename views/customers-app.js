const { createApp } = Vue;

createApp({
    data() {
        return {
            storeCustomers: []
        };
    },
    computed: {
        globalAmountSpent() {
            return this.storeCustomers.reduce((monetaryTotal, currentRecord) => {
                return monetaryTotal + (currentRecord.spent || 0);
            }, 0);
        }
    },
    mounted() {
        this.loadCustomerRecords();
    },
    methods: {
        async loadCustomerRecords() {
            try {
                const apiResponse = await fetch("/computerStore/customers");
                if (!apiResponse.ok) {
                    throw new Error("Failed to fetch customer directory database");
                }
                this.storeCustomers = await apiResponse.json();
            } catch (fetchingError) {
                console.error("System error tracking data:", fetchingError);
            }
        }
    }
}).mount('#customer-dashboard');