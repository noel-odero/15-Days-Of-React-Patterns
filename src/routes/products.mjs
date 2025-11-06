import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    console.log(request.headers.cookies)
    console.log(request.cookies)
    response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);

});

export default router;