# Vault

```
cell get_vault_contract_data()
```

Returns contract's data cell. To be removed later.

```
(slice, int, int, int, int, int, int, int) get_vault_data()
```

Returns:

- Contract's `jetton_wallet`
- LP's `rate`
- `lp_total_supply`
- `free_balance`. Amount of lp-providers' locked amount.
- `locked_balance`. Amount of traders' locked amount.
- `withdraw_locked_balance`. Amount of withdrawn locked amount. To be removed later.
- `stakers_balance`. Amount of STORM stakers' USD reward from protocol commissions (30% of fees).
- `executors_balance`. Balance common balance of orders executors. Rewards for executing orders (0.02% of position notional) are splited as 60% to single executor, 40% to the executor pool.

```
cell get_vault_whitelisted_addresses
```

Returns dict of whitelisted addresses.

```
slice get_position_address(slice trader_addr, slice vamm_addr)
```

Returns computed address of trader's/vamm's position manager address. This contract holds long/short positions, _position orders_, limit orders and referral data.

```
slice get_vamm_address(int asset_index)
```

Computes vamm address for a given _asset_index_.

```
slice get_lp_minter_address()
```

Computes a lp wallet address.

```
slice get_referral_item_addr(int referral_index)
```

Computes a referral nft item.

```
slice get_executor_item_addr(int executor_index)
```

Computes an executor nft item.

```
slice get_referral_collection_address()
```

Returns the Referral Collection address.

```
slice get_executor_collection_address()
```

Returns the Executor Collection address.

---

# Position Manager

```
cell get_position_manager_contract_data()
```

Returns contract's data cell. To be removed later.

```
(slice, slice, slice, cell, cell, cell, cell, int) get_position_manager_data()
```

Returns:

- `trader_addr`. Contracts's trader address.
- `vault_addr`. Contract's vault address.
- `vamm_addr`. Contract's market address.
- `long_record`. Trader's long position. Empty cell if null.
- `short_record`. Trader's short position. Empty cell if null.
- `orders_dict`. Trader's limit and market orders. Empty cell if null.
- `referral_data`. Position's referral data. Empty if contract is not inited. Empty cell if null.
- `orders_bitset`. Limit/market orders bitset.

---

# vAMM

```
cell get_amm_contract_data()
```

Returns contract's data cell. To be removed later.

```
(slice, int) get_amm_name()
```

Returns:

- `vault_addr`
- `asset_id`. Asset id, associated with a corresponding oracle

```
int get_amm_balance()
```

Virtual amm's balance.

```
(int, int) get_amm_status()
```

Returns:

- `close_only`. Is _close position only_ mode enabled.
- `paused`. Is _market paused_ mode enabled.

```
_ get_amm_state()
```

Returns AmmState struct (from scheme.tlb)

```
(int, int, int, int, int, int, int, int, int, int, int, int, int, int, int, int, int, int) get_exchange_settings()
```

Returns Exchange settings struct (from scheme.tlb) with an additional settings, such as:

- `executor_fee`. Executor's fee from position open notional.
- `close_position_time_delta`. Time from last position update till trader can close his position.
- `max_unrealized_pnl`. Max unrealized pnl percent to force close a position.

```
(int, int, int, int) get_can_liquidate(int new_price, cell position_ref)
```

Emulates whether liquidator can liquidate someone's position or not.
Takes:

- `new_price`. Oracle price for emulating.
- `position_ref`. PositionData struct as cell.

  Returns:

- `can_execute`
- `spot_margin_ratio`
- `liquidation_margin_ratio`
- `error_code`

```
(int, int, int) get_can_execute_order(int new_price, cell position_ref, cell order_ref)
```

Emulates whether executor can execute someone's order or not.
Takes:

- `new_price`. Oracle price for emulating.
- `position_ref`. PositionData struct as cell.
- `order_ref`. Order struct as cell.

  Returns:

- `can_execute`
- `spot_price`
- `error_code`

```
int get_spot_price()
```

```
_ get_remain_margin_with_funding_payment(int new_price, cell position_ref)
```

Calculates detailed position info.

Takes:

- `new_price`. Oracle price for calculating.
- `position_ref`. PositionData struct as cell.

Returns:

- `remain_margin`
- `funding_payment`
- `margin_ratio`
- `unrealized_pnl`
- `bad_debt`
- `position_notional`
- `rollover_fee`
- `new_price`. Oracle price.
- `spot_price`. Adjasted spot price.

```
int get_terminal_amm_price()
```

```
int get_peg_adjust_cost(int price)
```

Returns info about the cost to LP's (positive or negative) to sync to current price.

```
int get_adjusted_spot_price(int _price)
```

Returns adjusted spot price for a given oracle price.

```
int get_validate_signatures(cell oracle_payload)
```

Validates signatures offchain.

```
(int, int, int, int, int, int, cell) get_oracle_data()
```

Returns actual oracle data:

- `oracle_last_price`
- `oracle_last_spread`
- `oracle_last_timestamp`
- `oracle_max_deviation`
- `oracle_validity_period`
- `oracle_public_keys_count`
- `oracle_public_keys_ref`
