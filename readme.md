``````
# caa webhook

req: {
    app_id: 'jukoq-ncfp5hjfigfk5yi',
    avatar_url: 'https://omnichannel.qiscus.com/img/ic_qiscus_client.png',
    candidate_agent: {
      avatar_url: null,
      created_at: '2023-11-07T03: 41: 11Z',
      email: 'agent5@tes.com',
      force_offline: false,
      id: 164868,
      is_available: true,
      is_verified: false,
      last_login: '2023-11-07T07: 38: 12Z',
      name: 'Agent 5',
      sdk_email: 'QXVxD_agent5@tes.com',
      sdk_key: '62-972f-f4450ec3',
      type: 2,
      type_as_string: 'agent',
      updated_at: '2023-11-07T08: 37: 36Z'
    },
    email: 'hai@tes.com',
    extras: '{
        "additional_extras": {
            "timezone_offset": 7
        },
        "notes": null,
        "timezone_offset": null,
        "user_properties": []
    }',
    is_new_session: true,
    is_resolved: false,
    latest_service: null,
    name: 'hai',
    room_id: '187250792',
    source: 'qiscus'
}
``````

``````
res: {
  data: {
    agent: {
      id: 164867,
      name: 'Agent 4',
      sdk_email: '7Btdn_agent4@tes.com',
      email: 'agent4@tes.com',
      sdk_key: '89-8276-bd52db00',
      type: 2,
      is_available: true,
      avatar_url: null,
      is_verified: false,
      force_offline: false,
      count: 0
    }
  }
}
``````

auth admin: QEXJZS2GBLPcRkvYVsVS5ZgsIcOWjsthqfT2q4U1Vxm


```
# resolve webhook

req: {
  "customer": {
    "additional_info": [],
    "avatar": "https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/wMWsDZP6ta/1516689726-ic_qiscus_client.png",
    "name": "𰹧䄙",
    "user_id": "tester_73@test.com"
  },
  "resolved_by": {
    "email": "qiscus_33669_rizki@qiscus.net",
    "id": 164863,
    "is_available": true,
    "name": "Qiscus",
    "type": "admin"
  },
  "service": {
    "first_comment_id": "1785020101",
    "id": 78906598,
    "is_resolved": true,
    "last_comment_id": "1785050895",
    "notes": null,
    "room_id": "187259779",
    "source": "qiscus"
  }
}
```