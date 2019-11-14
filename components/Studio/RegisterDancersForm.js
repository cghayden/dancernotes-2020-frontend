<Query query={STUDIO_ALL_DANCERS_QUERY}>
  {({ data: { studioDancers }={}, error, loading }) => {
    return (
      <div>
        {this.state.size === "Solo" && (
          <label htmlFor="dancer">
            Dancer:
            <select
              required
              id="dancer"
              name="dancer"
              value={this.state.dancer}
              onChange={this.handleChange}
            >
              <option default value={""} disabled>
                Dancer...
              </option>
              {studioDancers.map(dancer => (
                <option key={dancer.id} value={dancer.id}>
                  {dancer.firstName}
                </option>
              ))}
            </select>
          </label>
        )}
        {this.state.size === "Duo" && <p>double dancer select</p>}
        {this.state.size === "Trio" && <p>triple dancer select</p>}
      </div>
    );
  }}
</Query>;
