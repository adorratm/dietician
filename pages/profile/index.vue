<template>
	<div v-if="!isEmpty(userData) && userData.status !== 'dietician'">
		<div class="breadcrumb-bar">
			<v-container fluid>
				<nav aria-label="breadcrumb" class="page-breadcrumb">
					<ol class="breadcrumb pl-0">
						<li class="breadcrumb-item">
							<nuxt-link to="/">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Profil
						</li>
					</ol>
				</nav>
				<h2 class="breadcrumb-title">Profil</h2>
			</v-container>
		</div>
		<div class="content">
			<v-container fluid>
				<v-row>
					<v-col
						cols="12"
						sm="12"
						md="5"
						lg="4"
						xl="3"
					>
					</v-col>

					<v-col cols="12" sm="12" md="7" lg="8" xl="9">
						<div class="card card-table mb-0">
							<div class="card-header">
								<div class="card-title my-0">
									<h4 class="my-0">Kayıt Bilgileri</h4>
								</div>
							</div>
							<div class="card-body">
								<div class="appointment-tab">
									<ul
										class="nav nav-tabs nav-tabs-solid nav-tabs-rounded rounded-0"
									>
										<li class="nav-item">
											<a
												class="nav-link active"
												href="#kayit_bilgilerim"
												data-toggle="tab"
												>Kayıt Bilgilerim</a
											>
										</li>
										<li class="nav-item">
											<a
												class="nav-link"
												href="#kayit_bilgisi_duzenle"
												data-toggle="tab"
												>Kayıt Bilgisi Düzenle</a
											>
										</li>
									</ul>

									<div class="tab-content">
										<div class="tab-pane show active" id="kayit_bilgilerim">
											<div class="table-responsive bg-light">
												<table
													class="table table-striped table-hover table-center table-borderless mb-0"
													style="border-top: none"
												>
													<tbody>
														<tr>
															<td>
																<b>Ad Soyad :</b>
															</td>
															<td colspan="2">
																{{ userData.name }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Cinsiyet :</b>
															</td>
															<td colspan="2">
																{{ userData.gender }}
															</td>
														</tr>
														<tr>
															<td>
																<b>İkamet Ettiğiniz İl :</b>
															</td>
															<td colspan="2">
																{{ userData.city }}
															</td>
														</tr>
														<tr>
															<td>
																<b>İkamet Ettiğiniz İlçe :</b>
															</td>
															<td colspan="2">
																{{ userData.town }}
															</td>
														</tr>
														<tr>
															<td>
																<b>İkamet Ettiğiniz Semt :</b>
															</td>
															<td colspan="2">
																{{ userData.district }}
															</td>
														</tr>
														<tr>
															<td>
																<b>İkamet Ettiğiniz Mahalle :</b>
															</td>
															<td colspan="2">
																{{ userData.neighborhood }}
															</td>
														</tr>
														<tr>
															<td>
																<b>İkamet Ettiğiniz Adres :</b>
															</td>
															<td colspan="2">
																{{ userData.address }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Doğum Tarihi :</b>
															</td>
															<td colspan="2">
																{{ userData.birthDate }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Boy (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.size }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Ağırlık (kg) :</b>
															</td>
															<td colspan="2">
																{{ userData.weight }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Bel (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.waist }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Kalça (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.hip }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Göğüs (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.chest }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Boyun (cm) : </b>
															</td>
															<td colspan="2">
																{{ userData.neck }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Üst Kol (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.upperArm }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Alt Kol (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.lowerArm }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Kol Bileği (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.wrist }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Üst Bacak (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.upperLeg }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Alt Bacak (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.lowerLeg }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Deri Kıvrım Kalınlığı (cm) :</b>
															</td>
															<td colspan="2">
																{{ userData.skinfoldThickness }}
															</td>
														</tr>
														<tr>
															<td>
																<b>Yağ :</b>
															</td>
															<td>
																%
																{{ userData.fatRatio }}
															</td>
															<td>
																{{ userData.fat }}
																KG
															</td>
														</tr>
														<tr>
															<td>
																<b>Kas :</b>
															</td>
															<td>
																%
																{{ userData.muscleRatio }}
															</td>
															<td>
																{{ userData.muscle }}
																KG
															</td>
														</tr>
														<tr>
															<td>
																<b>Su :</b>
															</td>
															<td>
																%
																{{ userData.waterRatio }}
															</td>
															<td>
																{{ userData.water }}
																KG
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>

										<div class="tab-pane" id="kayit_bilgisi_duzenle">
											<ValidationObserver v-slot="{ handleSubmit }">
												<form
													@submit.prevent="handleSubmit(updateInformation)"
													ref="informationForm"
													enctype="multipart/form-data"
												>
													<div class="table-responsive">
														<table
															class="table table-striped table-hover table-center table-borderless mb-0"
															style="border-top: none"
														>
															<tbody>
																<tr>
																	<td>
																		<b>Ad Soyad :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Adınız ve Soyadınız"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				id="name"
																				type="text"
																				class="form-control"
																				name="name"
																				v-model="userData.name"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Cinsiyet :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Cinsiyetiniz"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<v-radio-group
																				v-model="userData.gender"
																				name="gender"
																				row
																			>
																				<v-radio value="Erkek">
																					<template v-slot:label>
																						Erkek
																					</template>
																				</v-radio>
																				<v-radio value="Kadın">
																					<template v-slot:label>
																						Kadın
																					</template>
																				</v-radio>
																			</v-radio-group>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz İl :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz İl"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getTowns"
																				name="city"
																				id="city"
																				class="form-control"
																				v-if="!isEmpty(country.cities)"
																				ref="city"
																			>
																				<option
																					:value="null"
																					:selected="isEmpty(userData.city)"
																				>
																					İl Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="city.towns"
																						:value="city.name"
																						v-bind:key="index"
																						v-for="(city,
																						index) in country.cities"
																						:selected="
																							userData.city === city.name
																						"
																					>
																						{{ city.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz İlçe :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz İlçe"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getDistricts"
																				name="town"
																				id="town"
																				class="form-control"
																				ref="town"
																			>
																				<option
																					:value="null"
																					v-if="country.towns.length > 0"
																					selected
																				>
																					İlçe Seçiniz.
																				</option>
																				<option
																					:value="null"
																					v-else-if="country.towns.length <= 0"
																					selected
																				>
																					Önce İl Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="town.districts"
																						:value="town.name"
																						v-bind:key="index"
																						v-for="(town,
																						index) in country.towns"
																						:selected="
																							town.name === userData.town
																						"
																					>
																						{{ town.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz Semt :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz Semt"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getNeighborhoods"
																				name="district"
																				id="district"
																				class="form-control"
																				ref="district"
																			>
																				<option
																					:value="null"
																					v-if="country.districts.length > 0"
																					selected
																				>
																					Semt Seçiniz.
																				</option>
																				<option
																					:value="userData.district"
																					v-else-if="
																						country.districts.length <= 0
																					"
																					selected
																				>
																					Önce İlçe Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="
																							district.neighborhoods
																						"
																						:value="district.name"
																						v-bind:key="index"
																						v-for="(district,
																						index) in country.districts"
																						:selected="
																							district.name ===
																								userData.district
																						"
																					>
																						{{ district.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz Mahalle :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz Mahalle"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				name="neighborhood"
																				id="neighborhood"
																				class="form-control"
																				ref="neighborhood"
																			>
																				<option
																					:value="null"
																					v-if="
																						country.neighborhoods.length > 0
																					"
																					selected="selected"
																				>
																					Mahalle Seçiniz.
																				</option>
																				<option
																					:value="userData.neighborhood"
																					v-else-if="
																						country.neighborhoods.length <= 0
																					"
																					selected="selected"
																				>
																					Önce Semt Seçiniz.
																				</option>
																				<client-only>
																					<option
																						:value="neighborhood.name"
																						v-bind:key="index"
																						v-for="(neighborhood,
																						index) in country.neighborhoods"
																						:selected="
																							neighborhood.name ===
																								userData.neighborhood
																						"
																					>
																						{{ neighborhood.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz Adres :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz Adres"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<textarea
																				name="address"
																				id="address"
																				class="form-control"
																				cols="30"
																				rows="5"
																				v-model="userData.address"
																			></textarea>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Doğum Tarihi :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Doğum Tarihi"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="date"
																				class="form-control"
																				name="birthDate"
																				placeholder="Doğum Tarihi"
																				v-model="userData.birthDate"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Boy (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Boy (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="size"
																				id="size"
																				class="form-control"
																				v-model="userData.size"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Ağırlık (kg) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Ağırlık (kg)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="weight"
																				id="weight"
																				class="form-control"
																				v-model="userData.weight"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Bel (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Bel (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="waist"
																				id="waist"
																				class="form-control"
																				v-model="userData.waist"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Kalça (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Kalça (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="hip"
																				id="hip"
																				class="form-control"
																				v-model="userData.hip"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Göğüs (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Göğüs (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="chest"
																				id="chest"
																				class="form-control"
																				v-model="userData.chest"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Boyun (cm) : </b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Boyun (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="neck"
																				id="neck"
																				class="form-control"
																				v-model="userData.neck"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Üst Kol (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Üst Kol (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="upperArm"
																				id="upperArm"
																				class="form-control"
																				v-model="userData.upperArm"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Alt Kol (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Alt Kol (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="lowerArm"
																				id="lowerArm"
																				class="form-control"
																				v-model="userData.lowerArm"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Kol Bileği (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Kol Bileği (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="wrist"
																				id="wrist"
																				class="form-control"
																				v-model="userData.wrist"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Üst Bacak (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Üst Bacak (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="upperLeg"
																				id="upperLeg"
																				class="form-control"
																				v-model="userData.upperLeg"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Alt Bacak (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Alt Bacak (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="lowerLeg"
																				id="lowerLeg"
																				class="form-control"
																				v-model="userData.lowerLeg"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Deri Kıvrım Kalınlığı (cm) :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Deri Kıvrım Kalınlığı (cm)"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="number"
																				name="skinfoldThickness"
																				id="skinfoldThickness"
																				class="form-control"
																				v-model="userData.skinfoldThickness"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Yağ :</b>
																	</td>
																	<td>
																		%
																		{{ userData.fatRatio }}
																	</td>
																	<td>
																		{{ userData.fat }}
																		KG
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Kas :</b>
																	</td>
																	<td>
																		%
																		{{ userData.muscleRatio }}
																	</td>
																	<td>
																		{{ userData.muscle }}
																		KG
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Su :</b>
																	</td>
																	<td>
																		%
																		{{ userData.waterRatio }}
																	</td>
																	<td>
																		{{ userData.water }}
																		KG
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>Profil Resminiz :</b>
																	</td>
																	<td colspan="2" class="align-middle">
																		<v-row>
																			<v-col
																				cols="12"
																				sm="12"
																				md="12"
																				lg="4"
																				xl="4"
																				class="text-center align-middle py-auto my-auto"
																			>
																				<img
																					v-bind:src="
																						img_url + userData.img_url
																					"
																					class="img-fluid rounded-profile"
																					alt="Profil Resminiz"
																				/>
																			</v-col>
																			<v-col
																				cols="12"
																				sm="12"
																				md="12"
																				lg="8"
																				xl="8"
																				class="align-middle py-auto my-auto"
																			>
																				<input
																					type="file"
																					class="form-control"
																					accept="image/*"
																					placeholder="Profil Resminiz"
																					name="img_url"
																				/>
																			</v-col>
																		</v-row>
																	</td>
																</tr>
															</tbody>
															<tfoot>
																<tr>
																	<td colspan="3">
																		<div class="form-group">
																			<v-btn
																				color="primary"
																				class="float-right"
																				type="submit"
																			>
																				Bilgilerimi Güncelle
																			</v-btn>
																		</div>
																	</td>
																</tr>
															</tfoot>
														</table>
													</div>
												</form>
											</ValidationObserver>
										</div>
									</div>
								</div>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</div>
	<div v-else-if="!isEmpty(userData) && userData.status === 'dietician'">
		<div class="breadcrumb-bar">
			<v-container fluid>
				<nav aria-label="breadcrumb" class="page-breadcrumb">
					<ol class="breadcrumb pl-0">
						<li class="breadcrumb-item">
							<nuxt-link to="/">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Profil
						</li>
					</ol>
				</nav>
				<h2 class="breadcrumb-title">Profil</h2>
			</v-container>
		</div>
		<div class="content">
			<v-container>
				<v-row>
					<v-col
						cols="12"
						sm="12"
						md="5"
						lg="4"
						xl="3"
					>
					</v-col>

					<v-col cols="12" sm="12" md="7" lg="8" xl="9">
						<div class="card card-table mb-0">
							<div class="card-header">
								<div class="card-title my-auto">
									<h4 class="my-auto">Kayıt Bilgileri</h4>
								</div>
							</div>
							<div class="card-body">
								<div class="appointment-tab">
									<ul
										class="nav nav-tabs nav-tabs-solid nav-tabs-rounded rounded-0"
									>
										<li class="nav-item">
											<a
												class="nav-link active"
												href="#diyetisyen_kayit_bilgilerim"
												data-toggle="tab"
												>Kayıt Bilgilerim</a
											>
										</li>
										<li class="nav-item">
											<a
												class="nav-link"
												href="#diyetisyen_kayit_bilgisi_duzenle"
												data-toggle="tab"
												>Kayıt Bilgisi Düzenle</a
											>
										</li>
									</ul>

									<div class="tab-content">
										<div
											class="tab-pane show active"
											id="diyetisyen_kayit_bilgilerim"
										>
											<div class="table-responsive bg-light">
												<table
													class="table table-striped table-hover table-center table-borderless mb-0"
													style="border-top: none"
												>
													<tbody>
														<tr>
															<td><b>Ad Soyad :</b></td>
															<td colspan="2">{{ userData.name }}</td>
														</tr>
														<tr>
															<td><b>Cinsiyet :</b></td>
															<td colspan="2">{{ userData.gender }}</td>
														</tr>
														<tr>
															<td><b>İkamet Ettiğiniz İl :</b></td>
															<td colspan="2">{{ userData.city }}</td>
														</tr>
														<tr>
															<td><b>İkamet Ettiğiniz İlçe :</b></td>
															<td colspan="2">{{ userData.town }}</td>
														</tr>
														<tr>
															<td><b>İkamet Ettiğiniz Semt :</b></td>
															<td colspan="2">{{ userData.district }}</td>
														</tr>
														<tr>
															<td><b>İkamet Ettiğiniz Mahalle :</b></td>
															<td colspan="2">{{ userData.neighborhood }}</td>
														</tr>
														<tr>
															<td><b>İkamet Ettiğiniz Adres :</b></td>
															<td colspan="2">{{ userData.address }}</td>
														</tr>
														<tr>
															<td><b>Doğum Tarihi :</b></td>
															<td colspan="2">{{ userData.birthDate }}</td>
														</tr>
														<tr>
															<td><b>İş Yerinizin Bulunduğu İl :</b></td>
															<td colspan="2">{{ userData.company_city }}</td>
														</tr>
														<tr>
															<td><b>İş Yerinizin Bulunduğu İlçe :</b></td>
															<td colspan="2">{{ userData.company_town }}</td>
														</tr>
														<tr>
															<td><b>İş Yerinizin Bulunduğu Semt :</b></td>
															<td colspan="2">
																{{ userData.company_district }}
															</td>
														</tr>
														<tr>
															<td>
																<b>İş Yerinizin Bulunduğu Mahalle :</b>
															</td>
															<td colspan="2">
																{{ userData.company_neighborhood }}
															</td>
														</tr>
														<tr>
															<td><b>İşyerinizin Adresi :</b></td>
															<td colspan="2">
																{{ userData.company_address }}
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="tab-pane" id="diyetisyen_kayit_bilgisi_duzenle">
											<ValidationObserver v-slot="{ handleSubmit }">
												<form
													@submit.prevent="handleSubmit(updateInformation)"
													ref="informationForm"
													enctype="multipart/form-data"
												>
													<div class="table-responsive">
														<table
															class="table table-striped table-hover table-center table-borderless mb-0"
															style="border-top: none"
														>
															<tbody>
																<tr>
																	<td><b>Ad Soyad :</b></td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Adınız ve Soyadınız"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				id="dietician_name"
																				type="text"
																				class="form-control"
																				name="name"
																				v-model="userData.name"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td><b>Cinsiyet :</b></td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Cinsiyetiniz"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<v-radio-group
																				v-model="userData.gender"
																				name="gender"
																				row
																			>
																				<v-radio value="Erkek">
																					<template v-slot:label>
																						Erkek
																					</template>
																				</v-radio>
																				<v-radio value="Kadın">
																					<template v-slot:label>
																						Kadın
																					</template>
																				</v-radio>
																			</v-radio-group>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz İl :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz İl"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getTowns"
																				name="dietician_city"
																				id="dietician_city"
																				class="form-control"
																				v-if="!isEmpty(country.cities)"
																				ref="city"
																			>
																				<option
																					:value="null"
																					:selected="isEmpty(userData.city)"
																				>
																					İl Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="city.towns"
																						:value="city.name"
																						v-bind:key="index"
																						v-for="(city,
																						index) in country.cities"
																						:selected="
																							userData.city === city.name
																						"
																					>
																						{{ city.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz İlçe :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz İlçe"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getDistricts"
																				name="dietician_town"
																				id="dietician_town"
																				class="form-control"
																				ref="town"
																			>
																				<option
																					:value="null"
																					v-if="country.towns.length > 0"
																					selected
																				>
																					İlçe Seçiniz.
																				</option>
																				<option
																					:value="null"
																					v-else-if="country.towns.length <= 0"
																					selected
																				>
																					Önce İl Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="town.districts"
																						:value="town.name"
																						v-bind:key="index"
																						v-for="(town,
																						index) in country.towns"
																						:selected="
																							town.name === userData.town
																						"
																					>
																						{{ town.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz Semt :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz Semt"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getNeighborhoods"
																				name="dietician_district"
																				id="dietician_district"
																				class="form-control"
																				ref="district"
																			>
																				<option
																					:value="null"
																					v-if="country.districts.length > 0"
																					selected
																				>
																					Semt Seçiniz.
																				</option>
																				<option
																					:value="userData.district"
																					v-else-if="
																						country.districts.length <= 0
																					"
																					selected
																				>
																					Önce İlçe Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="
																							district.neighborhoods
																						"
																						:value="district.name"
																						v-bind:key="index"
																						v-for="(district,
																						index) in country.districts"
																						:selected="
																							district.name ===
																								userData.district
																						"
																					>
																						{{ district.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İkamet Ettiğiniz Mahalle :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz Mahalle"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				name="dietician_neighborhood"
																				id="dietician_neighborhood"
																				class="form-control"
																				ref="neighborhood"
																			>
																				<option
																					:value="null"
																					v-if="
																						country.neighborhoods.length > 0
																					"
																					selected="selected"
																				>
																					Mahalle Seçiniz.
																				</option>
																				<option
																					:value="userData.neighborhood"
																					v-else-if="
																						country.neighborhoods.length <= 0
																					"
																					selected="selected"
																				>
																					Önce Semt Seçiniz.
																				</option>
																				<client-only>
																					<option
																						:value="neighborhood.name"
																						v-bind:key="index"
																						v-for="(neighborhood,
																						index) in country.neighborhoods"
																						:selected="
																							neighborhood.name ===
																								userData.neighborhood
																						"
																					>
																						{{ neighborhood.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td><b>İkamet Ettiğiniz Adres :</b></td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İkamet Ettiğiniz Adres"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<textarea
																				name="address"
																				id="dietician_address"
																				class="form-control"
																				cols="30"
																				rows="5"
																				v-model="userData.address"
																			></textarea>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td><b>Doğum Tarihi :</b></td>
																	<td colspan="2">
																		<ValidationProvider
																			name="Doğum Tarihi"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<input
																				type="date"
																				class="form-control"
																				name="birthDate"
																				placeholder="Doğum Tarihi"
																				v-model="userData.birthDate"
																			/>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İş Yerinizin Bulunduğu İl :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İş Yerinizin Bulunduğu İl"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getTowns"
																				name="company_city"
																				id="company_city"
																				class="form-control"
																				v-if="!isEmpty(country2.cities)"
																				ref="company_city"
																			>
																				<option
																					:value="null"
																					:selected="
																						isEmpty(userData.company_city)
																					"
																				>
																					İl Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="city.towns"
																						:value="city.name"
																						v-bind:key="index"
																						v-for="(city,
																						index) in country2.cities"
																						:selected="
																							userData.company_city ===
																								city.name
																						"
																					>
																						{{ city.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İş Yerinizin Bulunduğu İlçe:</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İş Yerinizin Bulunduğu İlçe"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getDistricts"
																				name="company_town"
																				id="company_town"
																				class="form-control"
																				ref="company_town"
																			>
																				<option
																					:value="null"
																					v-if="country2.towns.length > 0"
																					selected
																				>
																					İlçe Seçiniz.
																				</option>
																				<option
																					:value="null"
																					v-else-if="country2.towns.length <= 0"
																					selected
																				>
																					Önce İl Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="town.districts"
																						:value="town.name"
																						v-bind:key="index"
																						v-for="(town,
																						index) in country2.towns"
																						:selected="
																							town.name ===
																								userData.company_town
																						"
																					>
																						{{ town.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İş Yerinizin Bulunduğu Semt :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İş Yerinizin Bulunduğu Semt"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				v-on:change="getNeighborhoods"
																				name="company_district"
																				id="company_district"
																				class="form-control"
																				ref="company_district"
																			>
																				<option
																					:value="null"
																					v-if="country2.districts.length > 0"
																					selected
																				>
																					Semt Seçiniz.
																				</option>
																				<option
																					:value="userData.district"
																					v-else-if="
																						country2.districts.length <= 0
																					"
																					selected
																				>
																					Önce İlçe Seçiniz.
																				</option>
																				<client-only>
																					<option
																						v-bind:data-id="
																							district.neighborhoods
																						"
																						:value="district.name"
																						v-bind:key="index"
																						v-for="(district,
																						index) in country2.districts"
																						:selected="
																							district.name ===
																								userData.company_district
																						"
																					>
																						{{ district.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td>
																		<b>İş Yerinizin Bulunduğu Mahalle :</b>
																	</td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İş Yerinizin Bulunduğu Mahalle"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<select
																				name="company_neighborhood"
																				id="company_neighborhood"
																				class="form-control"
																				ref="company_neighborhood"
																			>
																				<option
																					:value="null"
																					v-if="
																						country2.neighborhoods.length > 0
																					"
																					selected="selected"
																				>
																					Mahalle Seçiniz.
																				</option>
																				<option
																					:value="userData.neighborhood"
																					v-else-if="
																						country2.neighborhoods.length <= 0
																					"
																					selected="selected"
																				>
																					Önce Semt Seçiniz.
																				</option>
																				<client-only>
																					<option
																						:value="neighborhood.name"
																						v-bind:key="index"
																						v-for="(neighborhood,
																						index) in country2.neighborhoods"
																						:selected="
																							neighborhood.name ===
																								userData.company_neighborhood
																						"
																					>
																						{{ neighborhood.name }}
																					</option>
																				</client-only>
																			</select>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td><b>İşyerinizin Adresi :</b></td>
																	<td colspan="2">
																		<ValidationProvider
																			name="İşyerinizin Adresi"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<textarea
																				name="company_address"
																				id="company_address"
																				class="form-control"
																				cols="30"
																				rows="5"
																				v-model="userData.company_address"
																			></textarea>
																			<small
																				class="font-weight-bold text-danger"
																				>{{ errors[0] }}</small
																			>
																		</ValidationProvider>
																	</td>
																</tr>
																<tr>
																	<td><b>Profil Resminiz :</b></td>
																	<td colspan="2" class="align-middle">
																		<v-row>
																			<v-col
																				cols="12"
																				sm="12"
																				md="12"
																				lg="4"
																				xl="4"
																				class="text-center align-middle py-auto my-auto"
																			>
																				<img
																					v-bind:src="
																						img_url + userData.profile_photo
																					"
																					class="img-fluid rounded-profile"
																					alt="Profil Resminiz"
																				/>
																			</v-col>
																			<v-col
																				cols="12"
																				sm="12"
																				md="12"
																				lg="8"
																				xl="8"
																				class="align-middle py-auto my-auto"
																			>
																				<input
																					type="file"
																					accept="image/*"
																					class="form-control"
																					placeholder="Profil Resminiz"
																					name="profile_photo"
																				/>
																			</v-col>
																		</v-row>
																	</td>
																</tr>
																<tr>
																	<td><b>İşyerinizin Logosu :</b></td>
																	<td colspan="2" class="align-middle">
																		<v-row>
																			<v-col
																				cols="12"
																				sm="12"
																				md="12"
																				lg="4"
																				xl="4"
																				class="text-center align-middle py-auto my-auto"
																			>
																				<img
																					v-bind:src="
																						img_url + userData.company_logo
																					"
																					class="img-fluid align-middle py-auto my-auto"
																					width="225"
																					height="80"
																					alt="İşyerinizin Logosu"
																				/>
																			</v-col>
																			<v-col
																				cols="12"
																				sm="12"
																				md="12"
																				lg="8"
																				xl="8"
																				class="align-middle py-auto my-auto"
																			>
																				<input
																					type="file"
																					accept="image/*"
																					class="form-control"
																					placeholder="İşyerinizin Logosu"
																					name="company_logo"
																				/>
																			</v-col>
																		</v-row>
																	</td>
																</tr>
																<tr>
																	<td><b>Klinik Fotoğrafları :</b></td>
																	<td colspan="2">
																		<input
																			type="file"
																			accept="image/*"
																			class="form-control"
																			placeholder="Klinik Fotoğrafları"
																			name="clinic_photos[]"
																			multiple
																		/>
																	</td>
																</tr>
															</tbody>
															<tfoot>
																<tr>
																	<td colspan="3">
																		<div class="form-group">
																			<v-btn
																				color="primary"
																				class="float-right"
																				type="submit"
																			>
																				Bilgilerimi Güncelle
																			</v-btn>
																		</div>
																	</td>
																</tr>
															</tfoot>
														</table>
													</div>
												</form>
											</ValidationObserver>
										</div>
									</div>
								</div>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</div>
</template>

<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";

	export default {
		middleware: ["guest2"],
		name: "profile",
		components: {
			ValidationObserver,
			ValidationProvider,
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
		},
		mounted() {
			this.getCities();
			if (!this.isEmpty(this.userData) && this.userData.status === "dietician") {
				this.getCities2();
			}
			let inputs = document.querySelectorAll(".v-file-input input");
			[...inputs].forEach(input => {
				input.remove();
			});
		},
		data() {
			return {
				data: {
					cities: [],
					towns: [],
					districts: [],
					neighborhoods: [],
					company_cities: [],
					company_towns: [],
					company_districts: [],
					company_neighborhoods: [],
					city: "",
					town: "",
					district: "",
					neighborhood: "",
					company_city: "",
					company_town: "",
					company_district: "",
					company_neighborhood: ""
				},
				country: {
					cities: [],
					towns: [],
					districts: [],
					neighborhoods: []
				},
				country2: {
					cities: [],
					towns: [],
					districts: [],
					neighborhoods: []
				},
				months: [
					"OCAK",
					"ŞUBAT",
					"MART",
					"NİSAN",
					"MAYIS",
					"HAZİRAN",
					"TEMMUZ",
					"AĞUSTOS",
					"EYLÜL",
					"EKİM",
					"KASIM",
					"ARALIK"
				],
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
		},

		methods: {
			isEmpty(obj) {
				if (typeof obj == "number") return false;
				else if (typeof obj == "string") return obj.length == 0;
				else if (Array.isArray(obj)) return obj.length == 0;
				else if (typeof obj == "object")
					return obj == null || Object.keys(obj).length == 0;
				else if (typeof obj == "boolean") return false;
				else return !obj;
			},
			logout() {
				this.$auth.logout();
				this.$auth.$storage.removeUniversal("user");
				this.$auth.strategy.refreshToken.reset();
				this.$izitoast.success({
					title: "Başarılı!",
					message: "Başarıyla Çıkış Yaptınız Yönlendiriliyorsunuz.",
					position: "topCenter"
				});
				setTimeout(() => {
					this.$router.go("/");
				}, 2000);
			},
			getCities() {
				this.$axios
					.get(process.env.apiBaseUrl + "informations/cities")
					.then(response => {
						this.country.cities =
							response.data.data.cities.length > 0
								? response.data.data.cities
								: [];
						setTimeout(() => {
							this.getTowns();
						}, 100);
					});
			},
			getTowns: function(event) {
				let townIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					townIds = theTarget.id;
				}
				if (this.isEmpty(townIds)) {
					for (let element in this.$refs.city.options) {
						if (this.$refs.city.options[element].selected) {
							townIds = this.$refs.city.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(process.env.apiBaseUrl + "informations/towns?id=" + townIds)
					.then(response => {
						this.country.towns =
							response.data.towns.length > 0 ? response.data.towns : [];
						this.country.districts = [];
						this.userData.districts = [];
						this.country.neighborhoods = [];
						this.userData.neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getDistricts();
							}, 100);
						}
					});
			},
			getDistricts: function(event) {
				let districtIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					districtIds = theTarget.id;
				}
				if (this.isEmpty(districtIds)) {
					for (let element in this.$refs.town.options) {
						if (this.$refs.town.options[element].selected) {
							districtIds = this.$refs.town.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl + "informations/districts?id=" + districtIds
					)
					.then(response => {
						this.country.districts =
							response.data.districts.length > 0 ? response.data.districts : [];
						this.country.neighborhoods = [];
						this.userData.neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getNeighborhoods();
							}, 100);
						}
					});
			},
			getNeighborhoods: function(event) {
				let neighborhoodIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					neighborhoodIds = theTarget.id;
				}
				if (this.isEmpty(neighborhoodIds)) {
					for (let element in this.$refs.district.options) {
						if (this.$refs.district.options[element].selected) {
							neighborhoodIds = this.$refs.district.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"informations/neighborhoods?id=" +
							neighborhoodIds
					)
					.then(response => {
						this.country.neighborhoods =
							response.data.neighborhoods.length > 0
								? response.data.neighborhoods
								: [];
					});
			},
			getCities2() {
				this.$axios
					.get(process.env.apiBaseUrl + "informations/cities")
					.then(response => {
						this.country2.cities =
							response.data.data.cities.length > 0
								? response.data.data.cities
								: [];
						setTimeout(() => {
							this.getTowns2();
						}, 100);
					});
			},
			getTowns2: function(event) {
				let townIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					townIds = theTarget.id;
				}
				if (this.isEmpty(townIds)) {
					for (let element in this.$refs.company_city.options) {
						if (this.$refs.company_city.options[element].selected) {
							townIds = this.$refs.company_city.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(process.env.apiBaseUrl + "informations/towns?id=" + townIds)
					.then(response => {
						this.country2.towns =
							response.data.towns.length > 0 ? response.data.towns : [];
						this.country2.districts = [];
						this.userData.company_districts = [];
						this.country2.neighborhoods = [];
						this.userData.company_neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getDistricts2();
							}, 100);
						}
					});
			},
			getDistricts2: function(event) {
				let districtIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					districtIds = theTarget.id;
				}
				if (this.isEmpty(districtIds)) {
					for (let element in this.$refs.company_town.options) {
						if (this.$refs.company_town.options[element].selected) {
							districtIds = this.$refs.company_town.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl + "informations/districts?id=" + districtIds
					)
					.then(response => {
						this.country2.districts =
							response.data.districts.length > 0 ? response.data.districts : [];
						this.country2.neighborhoods = [];
						this.userData.company_neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getNeighborhoods2();
							}, 100);
						}
					});
			},
			getNeighborhoods2: function(event) {
				let neighborhoodIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					neighborhoodIds = theTarget.id;
				}
				if (this.isEmpty(neighborhoodIds)) {
					for (let element in this.$refs.company_district.options) {
						if (this.$refs.company_district.options[element].selected) {
							neighborhoodIds = this.$refs.company_district.options[element]
								.dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"informations/neighborhoods?id=" +
							neighborhoodIds
					)
					.then(response => {
						this.country2.neighborhoods =
							response.data.neighborhoods.length > 0
								? response.data.neighborhoods
								: [];
					});
			},
			updateInformation() {
				let formData = new FormData(this.$refs.informationForm);
				formData.append("api_token", this.userData.api_token);
				this.$axios
					.post(
						process.env.apiBaseUrl +
							(this.userData.status === "dietician"
								? "dietician/profile/update"
								: "users/update"),
						formData,
						{
							json: true,
							withCredentials: false,
							mode: "no-cors",
							headers: {
								"Access-Control-Allow-Origin": "*",
								"Access-Control-Allow-Headers":
									"Origin, Content-Type, X-Auth-Token, Authorization",
								"Access-Control-Allow-Methods":
									"GET, POST, PATCH, PUT, DELETE, OPTIONS",
								"Access-Control-Allow-Credentials": true,
								"Content-Type":
									"multipart/form-data; boundary=" + formData._boundary,
								Authorization: "Bearer " + this.userData.api_token
							}
						}
					)
					.then(response => {
						if (response.data.success) {
							this.$izitoast.success({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
							this.$auth.setUser(response.data.data);
							this.$auth.$storage.setUniversal("user", response.data.data);
							setTimeout(() => {
								this.$router.go("/profile");
							}, 2000);
						} else {
							this.$izitoast.error({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
						}
					});
			}
		}
	};
</script>
