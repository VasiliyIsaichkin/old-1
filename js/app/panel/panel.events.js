/* TopTai.ru EMS front-end application
 * http://visuallogic.iraxis.ru/
 * 
 * Copyright 2013, TopTai llc.
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

irixui.router.AddEvents('panel', {
    header: {
        onShow: {
            fn: function(ctx) {
                ctx.p('menu', {
                    style: 'user',
                    avatar: ctx.DX('user')[0]['avatar-mini'],
                    text: ctx.DX('user')[0].fullname,
                    dropdown: [{
                            name: 'unlogin',
                            text: 'Выход',
                            icon: 'signout',
                            open: 'unlogin'
                        }]
                });
            }
        }
    },
    page: {
        onMenuClick: {
            open_content: {
                from: 'pages'
            }
        },
        onAfterShow: {
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBD'
                }
            }
        }
    },
    mapLocationElement: {
        onMapMakerPostionChanged: {
            fn: function(ctx, ev) {
                ctx.IX('inRealEstateBDLocation_lat').set(ev.lat);
                ctx.IX('inRealEstateBDLocation_lng').set(ev.lng);
            }
        }
    },
    tblLocationList: {
        onAfterShow: {
            fn: function(ctx, data) {
                ctx.DX('re_locations/-current');
                ctx.DX('re_locations/-current_marker');
                ctx.DX('re_buildings/-location_id');
                ctx.DX('re_buildings/-forms');
                ctx.DX('re_buildings/-table');
            }
        },
        onTableBtnClick: {
            fn: function(ctx, data) {
                if (data.col === 'geo') {
                    ctx.IX('mapLocationList').map.setCenter(ctx.DX('re_locations?id=' + data.btn + '/markers/lat'), ctx.DX('re_locations?id=' + data.btn + '/markers/lng'));
                    ctx.IX('mapLocationList').map.setZoom(15);
                }
                if ((data.col === 'id') && (data.head)) {
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmRealEstateBDLocation'
                        }
                    }, data);
                }
                if ((data.col === 'id') && (!data.head)) {
                    ctx.DX('^re_locations?id=' + data.btn + '/+current');
                    ctx.DX('^re_locations?id=' + data.btn + '/+re_buildings.location_id/id');
                    ctx.DX('^re_locations?id=' + data.btn + '/+current_marker/markers');
                    ctx.DX('^re_buildings?<location_id=location_id!/+forms');
                    ctx.DX('re_buildings?<location_id=location_id/+table');
                    ctx.DX('re_buildings/-form');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmRealEstateBDLocation'
                        }
                    }, data);
                }
            }
        }
    },
    //LocationBuildingsList
    tblLocationBuildingsList: {
        onTableBtnClick: {
            fn: function(ctx, data) {
                if ((data.col === 'id') && (data.head)) {
                    ctx.DX('re_buildings/-form');
                    ctx.DX('re_building_rooms/-table');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmRealEstateBDLocationBuilding'
                        }
                    }, data);
                }
                if ((data.col === 'id') && (!data.head)) {
                    ctx.DX('re_buildings/forms?id=' + data.btn + '/+form');
                    ctx.DX('re_buildings/+re_building_rooms.building_id/form/id');
                    ctx.DX('^re_building_rooms?<building_id=building_id!/+forms');
                    ctx.DX('re_building_rooms?<building_id=building_id/+table');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmRealEstateBDLocationBuilding'
                        }
                    }, data);
                }
            }
        }
    },
    frmRealEstateBDLocation: {
        onAfterShow: {
            fn: function(ctx) {
                if (ctx.p('key_val') === false) {
                    ctx.IX('tblLocationBuildingsList_block').p('visible', false);
                    ctx.parent.parent.p('title', 'Добавление локации');
                    ctx.parent.parent.p('path', [{text: 'Недвижимость'}, {text: 'Локации'}, {text: 'Добавление'}]);
                } else {
                    ctx.IX('tblLocationBuildingsList_block').p('visible', true);
                    ctx.parent.parent.p('title', 'Изменение локации "' + ctx.DX('re_locations/current/name') + '"');
                    ctx.parent.parent.p('path', [{text: 'Недвижимость'}, {text: 'Локации'}, {text: ctx.DX('re_locations/current/name')}]);
                }
            }
        }
    },
    frmRealEstateBDLocation_btnBack: {
        onClick: {
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBD'
                }
            }
        }
    },
    frmRealEstateBDLocation_btnSave: {
        onClick: {
            fn: function(ctx) {
                ctx.IX('frmRealEstateBDLocation').p('save', 're_locations');
            },
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBD'
                }
            }
        }
    },
    //
    frmRealEstateBDLocationBuilding: {
        onAfterShow: {
            fn: function(ctx) {
                if (ctx.p('key_val') === false) {
                    ctx.IX('tblLocationBuildingsListRooms_block').p('visible', false);
                    ctx.parent.parent.p('title', 'Добавление строения');
                    ctx.parent.parent.p('path', [{text: 'Недвижимость'}, {text: 'Локации'}, {text: ctx.DX('re_locations/current/name')}, {text: 'Добавление строения'}]);
                } else {
                    ctx.IX('tblLocationBuildingsListRooms_block').p('visible', true);
                    ctx.parent.parent.p('title', 'Изменение строения "' + ctx.DX('re_buildings/form/name') + '"');
                    ctx.parent.parent.p('path', [{text: 'Недвижимость'}, {text: 'Локации'}, {text: ctx.DX('re_locations/current/name')}, {text: ctx.DX('re_buildings/form/name')}]);
                }
            }
        }
    },
    frmRealEstateBDLocationBuilding_btnSave: {
        onClick: {
            fn: function(ctx) {
                ctx.IX('frmRealEstateBDLocationBuilding').p('save', 're_buildings');
                ctx.DX('^re_buildings?<location_id=location_id!/+forms');
                ctx.DX('re_buildings?<location_id=location_id/+table');
                ctx.DX('re_buildings/-form');
            },
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBDLocation'
                }
            }
        }
    },
    frmRealEstateBDLocationBuilding_btnBack: {
        onClick: {
            fn: function(ctx) {
                ctx.DX('^re_buildings?<location_id=location_id!/+forms');
                ctx.DX('re_buildings?<location_id=location_id/+table');
                ctx.DX('re_buildings/-form');
            },
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBDLocation'
                }
            }
        }
    },
    tblLocationBuildingsListRooms: {
        onTableBtnClick: {
            fn: function(ctx, data) {
                if ((data.col === 'id') && (data.head)) {
                    ctx.DX('re_building_rooms/-form');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmRealEstateBDLocationBuildingRoom'
                        }
                    }, data);
                }
                if ((data.col === 'id') && (!data.head)) {
                    ctx.DX('re_building_rooms/forms?id=' + data.btn + '/+form');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmRealEstateBDLocationBuildingRoom'
                        }
                    }, data);
                }
            }
        }
    },
    frmRealEstateBDLocationBuildingRoom: {
        onAfterShow: {
            fn: function(ctx) {
                if (ctx.p('key_val') === false) {
                    ctx.parent.parent.p('title', 'Добавление команты');
                    ctx.parent.parent.p('path', [{text: 'Недвижимость'}, {text: 'Локации'}, {text: ctx.DX('re_locations/current/name')}, {text: ctx.DX('re_buildings/form/name')}, {text: 'Добавление комнаты'}]);
                } else {
                    ctx.parent.parent.p('title', 'Изменение комнаты');
                    ctx.parent.parent.p('path', [{text: 'Недвижимость'}, {text: 'Локации'}, {text: ctx.DX('re_locations/current/name')}, {text: ctx.DX('re_buildings/form/name')}, {text: 'Изменение комнаты'}]);
                }
            }
        }
    },
    frmRealEstateBDLocationBuildingRoom_btnSave: {
        onClick: {
            fn: function(ctx) {
                ctx.IX('frmRealEstateBDLocationBuildingRoom').p('save', 're_building_rooms');
                ctx.DX('^re_building_rooms?<building_id=building_id!/+forms');
                ctx.DX('re_building_rooms?<building_id=building_id/+table');
            },
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBDLocationBuilding'
                }
            }
        }
    },
    frmRealEstateBDLocationBuildingRoom_btnBack: {
        onClick: {
            fn: function(ctx) {
                ctx.DX('^re_building_rooms?<building_id=building_id!/+forms');
                ctx.DX('re_building_rooms?<building_id=building_id/+table');            },
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmRealEstateBDLocationBuilding'
                }
            }
        }
    },
    tblFinanceJournals: {
        onTableBtnClick: {
            fn: function(ctx, data) {
                if ((data.col === 'id') && (!data.head)) {
                    ctx.DX('finance_journals?id=' + data.btn + '/+finance_operations.curr_jid/id');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmFinanceOperations'
                        }
                    }, data);
                }
            }
        }
    },
    tblFinanceOperations: {
        onTableBtnClick: {
            fn: function(ctx, data) {
                if ((data.col === 'empty') && (data.head)) {
                    //ctx.DX('finance_operations?<jid=curr_jid!/+curr');
                    ctx.Call({
                        page: {
                            name: 'onMenuClick',
                            data: 'mmFinanceOperationAdd'
                        }
                    }, data);
                }
            }
        }
    },
    frmFinanceOperationAdd_btnSave: {
        onClick: {
            fn: function(ctx) {
                ctx.IX('frmFinanceOperationAdd').p('save', 'finance_operations');
            },
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmFinanceOperations'
                }
            }
        }
    },
    frmFinanceOperationAdd_btnBack: {
        onClick: {
            call: {
                page: {
                    name: 'onMenuClick',
                    data: 'mmFinanceOperations'
                }
            }
        }
    }
});  