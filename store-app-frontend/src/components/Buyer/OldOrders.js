const OldOrders = () =>{
    return (
        <>
        <Box display="flex" justifyContent="center" mt={2}>
                <h2>New orders</h2>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Delivery address</TableCell>
                            <TableCell align="right">Comment</TableCell>
                            <TableCell align="center">Order Time</TableCell>
                            <TableCell align="right">Delivery Time</TableCell>
                            <TableCell align="right">Countdown</TableCell>
                            <TableCell align="right">Purchased items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default OldOrders;