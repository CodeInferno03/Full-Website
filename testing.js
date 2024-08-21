const { deleteOneEntryUsers } = require("./website-backend/src/utils/db_utils/deleteDBEntry");

deleteOneEntryUsers({ username: 'jane-waves' }).then((result) => {
    if (result.success !== false) {
        console.log(result);
    } else {
        console.log(result);
    }
});
