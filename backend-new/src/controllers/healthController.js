const getHealth = (req, res)=>{
    res.send({ status: 'OK',timestamp: new Date().toISOString() });
}
export default getHealth;